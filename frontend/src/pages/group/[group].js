// ** MUI Imports
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import { useRouter } from 'next/router'
import CardImgTop from 'src/views/cards/CardImgTop'
import StatisticsCard from 'src/views/dashboard/StatisticsCard'
import Trophy from 'src/views/dashboard/Trophy'

const Group = () => {

  const router = useRouter()
  const { group } = router.query


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
