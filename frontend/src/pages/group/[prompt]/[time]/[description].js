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
import { Diversify } from 'mdi-material-ui'

const Group = () => {
  

  return (
    <Grid container spacing={6}>
      <Grid item xs={12} md={12}>
          <Trophy />
      </Grid>
      <Grid item xs={12} md={12}>
        <div>          
        <StatisticsCard />
        </div>
      </Grid>

      <Grid item xs={4}/>
      <Grid item xs={8}/>

      <Grid item xs={4}>
        <CardImgTop place={0}/>
      </Grid>
      <Grid item  xs={4}>
        <CardImgTop place={1}/>
      </Grid>
      <Grid item  xs={4}>
        <CardImgTop place={2}/>
      </Grid>

    </Grid>
  )
}

export default Group
