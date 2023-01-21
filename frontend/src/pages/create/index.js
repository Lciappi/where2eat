// ** MUI Imports
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import { useRouter } from 'next/router'
import { useState } from 'react'


const Join = () => {
  const router = useRouter()
  const [groupCode, setGroupCode] = useState('');

  return (
    <Grid container spacing={6}>
      <Grid item xs={3}/>
      <Grid item xs={6}>
        <TextField fullWidth label="Enter Group Code" id="fullWidth" onChange={(event) => {setGroupCode(event.target.value)}} />
        <br/>
        <br/>
      </Grid>

      <Grid item xs={3}/>
      <Grid item xs={3}/>
      <Grid item textAlign='center' xs={6}>
        <Button fullWidth={true} variant="contained" onClick={() => {router.push('/group/'+ groupCode)}}>
          Join {groupCode}
        </Button>
      </Grid>

      <Grid item xs={3}/>
    </Grid>
  )
}

export default Join
