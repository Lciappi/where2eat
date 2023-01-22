// ** MUI Imports
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import { useRouter } from 'next/router'
import CardImgTop from 'src/views/cards/CardImgTop'
import StatisticsCard from 'src/views/dashboard/StatisticsCard'
import Trophy from 'src/views/dashboard/Trophy'
import { useEffect } from 'react'

const Group = () => {

  const router = useRouter()
  const { prompt, time, description } = router.query

  useEffect(shoebc, [prompt, time, description]);

  async function shoebc() {   
    let uri = `http://localhost:5050/recommend?query=${prompt}&address=${description}`;
    var data = await fetch(uri, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    });

    let resp = await data.json();
    console.log(resp);
  }
  

  return (
    <Grid container spacing={6}>
      <Grid item xs={12} md={12}>
          <Trophy />
      </Grid>
      <Grid item xs={12} md={12}>
          <StatisticsCard />
      </Grid>
      <Grid item xs={4}/>
      <Grid item xs={8}/>
      <Grid item xs={4}>
        <CardImgTop />
      </Grid>
      <Grid item  xs={4}>
        <CardImgTop />
      </Grid>
      <Grid item  xs={4}>
        <CardImgTop />
      </Grid>

    </Grid>
  )
}

export default Group
