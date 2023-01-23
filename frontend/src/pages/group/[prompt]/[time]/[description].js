// ** MUI Imports
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import { useRouter } from 'next/router'
import CardImgTop from 'src/views/cards/CardImgTop'
import StatisticsCard from 'src/views/dashboard/StatisticsCard'
import Trophy from 'src/views/dashboard/Trophy'
import { useEffect } from 'react'
import { useState } from 'react'

const Group = () => {

  const [library, setLibrary] = useState();
  const router = useRouter();
  const { prompt, time, description } = router.query;
  let group = "-1";

  useEffect(shoebc, [prompt, time, description]);

  async function shoebc() {
    console.log([prompt, time, description])
    if(prompt === undefined || time === undefined || description === undefined) return;

    if(prompt == "-1"){
      group = time;
    }

    let uri = `http://localhost:5050/recommend?query=${encodeURIComponent(prompt)}&address=${encodeURIComponent(description)}&time=${encodeURIComponent(time)}&room=${encodeURIComponent(group)}`;
    var data = await fetch(uri, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    });

    console.log("link: ", uri)

    const resp = await data.json();
    
    if(resp == undefined) return;

    setLibrary(resp);
  }

  console.log("library: ", library)

  if(library == undefined) return (<div>Loading ...</div>)
  
  return (
    <Grid container spacing={6}>
      <Grid item xs={12} md={12}>
          <Trophy people={library.room}/>
      </Grid>
      <Grid item xs={12} md={12}>
        <div>          
        <StatisticsCard data={prompt} />
        </div>
      </Grid>

      <Grid item xs={4}/>
      <Grid item xs={8}/>

      <Grid item xs={4}>
        <CardImgTop place={0} resp={library} room={group}/>
      </Grid>
      <Grid item  xs={4}>
        <CardImgTop place={1} resp={library} room={group}/>
      </Grid>
      <Grid item  xs={4}>
        <CardImgTop place={2} resp={library} room={group}/>
      </Grid>
      <Grid item  xs={12}>
        <Button fullWidth={true} variant="contained" color="secondary" onClick={() => {router.push('/results/'+ time)}}>Show Results</Button>

      </Grid>

    </Grid>
  )
}

export default Group
