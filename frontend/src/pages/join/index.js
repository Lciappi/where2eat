// ** MUI Imports
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import { useRouter } from 'next/router';
import Alert from '@mui/material/Alert';
import { useState } from 'react'


const Join = () => {
  const [groupCode, setGroupCode] = useState('');
  const [aalert, setAalert] = useState(true);
  const router = useRouter()


  function createGroup() {
    if(groupCode == '') {
      //setAlert(true);
    } else{
      router.push('/group/'+ groupCode)
    }
  }

  return (
    <Grid container spacing={6}>
      <Grid item xs={3}/>
      <Grid item xs={6}>
        <TextField fullWidth label="Enter Group Code" id="fullWidth" onChange={(event) => {setGroupCode(event.target.value)}} />
        <br/>
      </Grid>

      <Grid item xs={3}/>
      <Grid item xs={3}/>
      <Grid item textAlign='center' xs={6}>
        {aalert ? <><Alert severity="error">Enter a Valid Code</Alert> <br/></> : null }
        <Button fullWidth={true} variant="contained" onClick={createGroup()}>
          Join Group
        </Button>
      </Grid>

      <Grid item xs={3}/>
    </Grid>
  )
}

export default Join
