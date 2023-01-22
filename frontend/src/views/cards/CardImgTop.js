// ** MUI Imports
import Card from '@mui/material/Card'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import { useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import SendIcon from '@mui/icons-material/Check';
import Button from '@mui/material/Button'

const CardImgTop = () => {
  const [restaurantName, setRestaurantName] = useState('')
  const [distance, setDistance] = useState('')
  const [address, setAddress] = useState('')
  const [image, setImage] = useState('')

  


  return (
    <Card>
      <CardMedia sx={{ height: '14.5625rem' }} image='/images/cards/glass-house.png' />
      <CardContent>
        <Typography variant='h6' sx={{ marginBottom: 2 }}>
          
        </Typography>
        <Typography variant='body2'>
          Distance:
        </Typography>
        <Typography variant='body2'>
          Address:
        </Typography>
        <br />
        <Button variant="contained" endIcon={<SendIcon />} fullWidth={true}>
          Like
        </Button>
        <br />
        <br />
        <Button  color="error" variant="contained" endIcon={<CloseIcon />} fullWidth={true}>
          Dislike    
        </Button>
      </CardContent>
    </Card>
  )
}

export default CardImgTop
