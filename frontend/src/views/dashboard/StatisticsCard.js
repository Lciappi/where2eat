// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Avatar from '@mui/material/Avatar'
import CardHeader from '@mui/material/CardHeader'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'

// ** Icons Imports
import TrendingUp from 'mdi-material-ui/TrendingUp'
import CurrencyUsd from 'mdi-material-ui/CurrencyUsd'
import DotsVertical from 'mdi-material-ui/DotsVertical'
import CellphoneLink from 'mdi-material-ui/CellphoneLink'
import AccountOutline from 'mdi-material-ui/AccountOutline'
import { Alarm } from 'mdi-material-ui';
import { Calendar } from 'mdi-material-ui';
import AccountDetails from 'mdi-material-ui/AccountDetails'
import { useRouter } from 'next/router'

const salesData = [
  {
    stats: '17:00',
    title: 'When to meet',
    color: 'primary',
    icon: <Alarm sx={{ fontSize: '1.75rem' }} />
  },
  {
    stats: '21-02-2022',
    title: 'Address',
    color: 'secondary',
    icon: <Calendar sx={{ fontSize: '1.75rem' }} />
  },
  {
    stats: 'affordable noodle place',
    color: 'warning',
    title: 'Prompt',
    icon: <AccountDetails sx={{ fontSize: '1.75rem' }} />
  }
]

const renderStats = (when, addy, message) => {
  const router = useRouter()
  const { prompt, time, description } = router.query

  let values = [time, description, prompt]

  if(prompt == "-1") {
    return
  }

  return salesData.map((item, index) => (
    <Grid item xs={12} sm={4} key={index}>
      <Box key={index} sx={{ display: 'flex', alignItems: 'center' }}>
        <Avatar
          variant='rounded'
          sx={{
            mr: 3,
            width: 50,
            height: 44,
            boxShadow: 3,
            color: 'common.white',
            backgroundColor: `${item.color}.main`
          }}
        >
          {item.icon}
        </Avatar>
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <Typography variant='caption'>{item.title}</Typography>
          <Typography variant='h6'>{values[index]}</Typography>
        </Box>
      </Box>
    </Grid>
  ))
}

const StatisticsCard = ({data}) => {
  return (
    <div>
      {data == "-1" ? <div></div> : <Card> 
        <CardHeader
          title="Details"
        />
        <CardContent sx={{ pt: theme => `${theme.spacing(0)} !important` }}>
          <Grid container spacing={[5, 0]}>
            {renderStats()}
          </Grid>
          
        </CardContent>
      </Card>}
    </div>
   
  )
}

export default StatisticsCard
