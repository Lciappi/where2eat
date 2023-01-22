// ** MUI Imports
import Card from '@mui/material/Card'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import { useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import SendIcon from '@mui/icons-material/Check';
import Button from '@mui/material/Button'
import { useRouter } from 'next/router'
import { useEffect } from 'react';
import Chip from '@mui/material/Chip';

const CardImgTop = ({place, resp}) => {
  const [information, setInformation] = useState(resp);

  const [restaurantName, setRestaurantName] = useState('')
  const [distance, setDistance] = useState('')
  const [address, setAddress] = useState('')
  const [driving, setDriving] = useState('')
  const [walking, setWalking] = useState('')
  const [open, setOpen] = useState(false)
  const [rating, setRating] = useState('')

  // console.log(resp.places[place].name)

  // //setRestaurantName(resp.places[place].name);
  // setDistance(resp.places[place].distance);
  // setAddress(resp.places[place].address.split(", BC")[0]);
  // setDriving(resp.places[place].driving_duration);
  // setWalking(resp.places[place].walking_duration);
  // setOpen(resp.places[place].open);
  // setRating(resp.places[place].rating)

  return (
    <Card>
      <CardContent>
        <Typography variant='h6' sx={{ marginBottom: 2 }}>
          {information.places[place].name}
        </Typography>
        <Chip label={open ? "Open Now" : "Closed Now"} color={open ? "success" : "error"} />
        <br />
        <br />
        <Typography variant='body2'>
          Distance: {information.places[place].distance}
        </Typography>
        <Typography variant='body2'>
          Address: {information.places[place].address}
        </Typography>
        <Typography variant='body2'>
          Time Driving: {information.places[place].driving_duration}
        </Typography>
        <Typography variant='body2'>
          Time Walking: {information.places[place].walking_duration}
        </Typography>
        <Typography variant='body2'>
          Rating: {information.places[place].rating}
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
