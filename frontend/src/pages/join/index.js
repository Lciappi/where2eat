// ** MUI Imports
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import { useRouter } from 'next/router';
import Alert from '@mui/material/Alert';
import { useState } from 'react'


const Join = () => {
  const [groupCode, setGroupCode] = useState('');
  const router = useRouter()

  function createGroup() {
    if(groupCode == '') {
      return
    } else {
      router.push('/group/'+ '-1' + '/' + groupCode + '/' + 'view')
    }
  }

  return (
    <Grid container spacing={6}>
      <Grid item xs={3}/>
      <Grid item xs={6}>
        <TextField fullWidth label="Enter Group Code" id="math" onChange={(event) => {setGroupCode(event.target.value)}} />
        <br/>
      </Grid>

      <Grid item xs={3}/>
      <Grid item xs={3}/>
      <Grid item textAlign='center' xs={6}>
        <Button id="gaga" fullWidth={true} variant="contained" onClick={createGroup}>
          Join Group
        </Button>
      </Grid>

      <Grid item xs={3}/>
    </Grid>
  )
}

export default Join
