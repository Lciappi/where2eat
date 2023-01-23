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

const CardImgTop = ({place, resp, room}) => {
  const [information, setInformation] = useState(resp);
  const [used, setUsed] = useState(false);

  const router = useRouter();
  const { time } = router.query;


  
  async function like() {
    setUsed(true)
    let uri = `http://localhost:5050/vote?room=${encodeURIComponent(time)}&place=${encodeURIComponent(place)}&voteIdx=${encodeURIComponent(0)}`;
    var data = await fetch(uri, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    });

    const resp = await data.json();
    
  }

  async function dislike() {
    setUsed(true)
    console.log('vote for', place, time)

    let uri = `http://localhost:5050/vote?room=${encodeURIComponent(time)}&place=${encodeURIComponent(place)}&voteIdx=${encodeURIComponent(1)}`;
    var data = await fetch(uri, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    });

    const resp = await data.json();
    
  }
  

  return (
    <Card>
      <CardContent>
        <Typography variant='h6' sx={{ marginBottom: 2 }}>
          {information.places[place].name}
        </Typography>
        <Chip label={information.places[place].open_now ? "Open Now" : "Closed Now"} color={information.places[place].open_now ? "success" : "error"} />
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
        <Button disabled={used} variant="contained" endIcon={<SendIcon />} fullWidth={true} onClick={like}>
          Like
        </Button>
        <br />
        <br />
        <Button disabled={used} color="error" variant="contained" endIcon={<CloseIcon />} fullWidth={true} onClick={dislike}>
          Dislike    
        </Button>
      </CardContent>
    </Card>
  )
}

export default CardImgTop
