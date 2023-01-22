// ** MUI Imports
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import dayjs, { Dayjs } from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import Script from 'next/script'
import { useGoogleMapsScript, Libraries } from 'use-google-maps-script'

const Join = () => {

  const router = useRouter()

  const [prompt, setPrompt] = useState('');
  const [address, setAddress] = useState('');
  const [time, setTime] = useState(dayjs('2014-08-18T21:11:54'));

  const handleChange = (newValue) => {
    setTime(newValue);
  };

  const libraries = ["places"]

  const { isLoaded, loadError } = useGoogleMapsScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
    libraries,
  });

  if (!isLoaded) return <h1>Loading ...</h1>;
  if (loadError) return <h1>Error loading maps</h1>;

  

  

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
    <ReadySearchBox 
      onSelectAddress={onSelectAddress}
      defaultValue = {defaultValue}
    />
    <Grid container spacing={6}>
      <Grid item xs={3}/>
      <Grid item xs={6} textAlign='center'>
        <TextField fullWidth label="Enter Prompt" id="promptId" onChange={(event) => {setPrompt(event.target.value)}} />
        <br/>
        <br/>
        <TimePicker
          label="Time"
          value={time}
          onChange={handleChange}
          renderInput={(params) => <TextField {...params} />}
        />
        <br />
        <br />  
        <TextField fullWidth label="Add Address" id="addressId" onChange={(event) => {setAddress(event.target.value)}} />


      </Grid>

      <Grid item xs={3}/>
      <Grid item xs={3}/>
      <Grid item textAlign='center' xs={6}>
        <Button fullWidth={true} variant="contained" >
          Eat!  
        </Button>
      </Grid>
      <Grid item xs={3}/>
    </Grid>
    </LocalizationProvider>
  )
}

function ReadySearchBox ({onSelectAddress, defaultValue}) {
  const {
    ready,
    value,
    setValue,
    suggestions: {status, data},
    clearSuggestions,
  } = usePlacesAutoComplete({debounce:300, defaultValue})

  return (
    <Autocomplete
      disablePortal
      id="combo-box-demo"
      options={top100Films}
      sx={{ width: 300 }}
      renderInput={(params) => <TextField {...params} label="Movie" />}
    />
  )
}

export default Join
