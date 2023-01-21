// ** MUI Imports
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import { useRouter } from 'next/router'


const Group = () => {
  const router = useRouter()
  const { group } = router.query


  return (
    <Grid container spacing={6}>
      <Grid item xs={3}/>
      <Grid item xs={6}>
        <h1>Welcome to Group {group}!</h1>
        <br/>
        <br/>
      </Grid>

      <Grid item xs={3}/>
      <Grid item xs={3}/>
      <Grid item textAlign='center' xs={6}>
        <Button variant="contained" onClick={() => {router.push('/')}}>
          Join Group
        </Button>
      </Grid>

      <Grid item xs={3}/>
    </Grid>
  )
}

export default Group
