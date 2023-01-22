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

const CardImgTop = ({place}) => {
  const router = useRouter()
  const { prompt, time, description } = router.query
  const [library, setLibrary] = useState();

  const [restaurantName, setRestaurantName] = useState('')
  const [distance, setDistance] = useState('')
  const [address, setAddress] = useState('')
  const [driving, setDriving] = useState('')
  const [walking, setWalking] = useState('')
  const [open, setOpen] = useState(false)
  const [group, setGroup] = useState("-1")





  useEffect(shoebc, [prompt, time, description]);

  async function shoebc() {
    if(prompt === undefined || time === undefined || description === undefined) return;

    let uri = `http://localhost:5050/recommend?query=${encodeURIComponent(prompt)}&address=${encodeURIComponent(description)}&time=${encodeURIComponent(time)}&room=${encodeURIComponent(group)})}`;
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
    setDriving(resp.places[place].driving);
    setWalking(resp.places[place].walking);
    setOpen(resp.places[place].open);

  }

  return (
    <Card>
      <CardContent>
        <Typography variant='h6' sx={{ marginBottom: 2 }}>
          {restaurantName}
        </Typography>
        <Chip label={open ? "Open" : "Closed"} color={open ? "success" : "error"} />
        <br />
        <Typography variant='body2'>
          Distance: {distance}
        </Typography>
        <Typography variant='body2'>
          Address: {address}
        </Typography>
        <Typography variant='body2'>
          Time Driving: {driving}
        </Typography>
        <Typography variant='body2'>
          Time Walking: {walking}
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
