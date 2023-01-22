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

const CardImgTop = ({place}) => {
  const router = useRouter()
  const { prompt, time, description } = router.query
  const [library, setLibrary] = useState();

  const [restaurantName, setRestaurantName] = useState('')
  const [distance, setDistance] = useState('')
  const [address, setAddress] = useState('')
  const [image, setImage] = useState('')



  useEffect(shoebc, [prompt, time, description]);

  async function shoebc() {
    if(prompt === undefined || time === undefined || description === undefined) return;

    let uri = `http://localhost:5050/recommend?query=${encodeURIComponent(prompt)}&address=${encodeURIComponent(description)}&time=${encodeURIComponent(time)}`;
    var data = await fetch(uri, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    });

    const resp = await data.json();
    console.log(resp)

    setLibrary(resp);

    setRestaurantName(resp.places[place].name);
    setDistance(resp.places[place].distance);
    setAddress(resp.places[place].address.split(", BC")[0]);
    

  }

  return (
    <Card>
      <CardMedia sx={{ height: '14.5625rem' }} image='/images/cards/glass-house.png' />
      <CardContent>
        <Typography variant='h6' sx={{ marginBottom: 2 }}>
          {restaurantName}
        </Typography>
        <Typography variant='body2'>
          Distance: {distance}
        </Typography>
        <Typography variant='body2'>
          Address: {address}
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
