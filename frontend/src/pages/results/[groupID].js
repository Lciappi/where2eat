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
import TableBasic from 'src/views/tables/TableBasic'
import { Card, CardHeader } from '@mui/material'
import CardContent from '@mui/material/CardContent'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { styled, useTheme } from '@mui/material/styles'


// Styled component for the trophy image
const TrophyImg = styled('img')({
    width: 20,
    height: 25
  })


const Results = () => {

  const router = useRouter();
  const [library, setLibrary] = useState();

  const { groupID } = router.query;

  useEffect(shoebc, [groupID]);

  async function shoebc() {
    if(groupID === undefined) return;

    let uri = `http://localhost:5050/results?room=${encodeURIComponent(groupID)}`;
    var data = await fetch(uri, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    console.log("link: ", uri)

    const resp = await data.json();
    console.log(resp)
    setLibrary(resp);
  }

  if(library == undefined) return (<div>Loading ...</div>)

  console.log(library)
  return (
    <Grid container spacing={6}>
      
    <Grid item xs={12}>
        <Card>
            <CardHeader
            title='Results'
            titleTypographyProps={{ sx: { lineHeight: '1.6 !important', letterSpacing: '0.15px !important' } }}
            
            />
            <CardContent sx={{ pt: theme => `${theme.spacing(2.25)} !important` }}>
            <Box
                sx={{
                display: 'flex',
                alignItems: 'center',
                }}
            >
                <Box
                sx={{
                    width: '100%',
                    display: 'flex',
                    flexWrap: 'wrap',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                }}
                >
                <Box sx={{ marginRight: 2, display: 'flex', flexDirection: 'column' }}>
                    <Typography variant='h4' sx={{ mb: 0.5, fontWeight: 600, color: 'text.primary' }}>
                    {library.places[0].isBest ? <TrophyImg alt='trophy' src='/images/misc/trophy.png' /> : null}
 {library.places[0].name}
                    </Typography>
                    <Typography variant='body2' sx={{ mb: 0.5, fontWeight: 600, color: 'text.primary' }}>
                    Likes: {library.places[0].votes[0]}
                    </Typography>
                    <Typography variant='body2' sx={{ mb: 0.5, fontWeight: 600, color: 'text.primary' }}>
                    Dislikes: {library.places[0].votes[1]}
                    </Typography>
                    <Typography variant='body2' sx={{ mb: 0.5, fontWeight: 600, color: 'text.primary' }}>
                    {library.places[0].address}
                    </Typography>
                    

                </Box>

                </Box>

                <Box
                sx={{
                    width: '100%',
                    display: 'flex',
                    flexWrap: 'wrap',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                }}
                >
                <Box sx={{ marginRight: 2, display: 'flex', flexDirection: 'column' }}>
                    <Typography variant='h4' sx={{ mb: 0.5, fontWeight: 600, color: 'text.primary' }}>
                    {library.places[1].isBest ? <TrophyImg alt='trophy' src='/images/misc/trophy.png' /> : null}
                    {library.places[1].name}
                    </Typography>
                    <Typography variant='body2' sx={{ mb: 0.5, fontWeight: 600, color: 'text.primary' }}>
                    Likes: {library.places[1].votes[0]}
                    </Typography>
                    <Typography variant='body2' sx={{ mb: 0.5, fontWeight: 600, color: 'text.primary' }}>
                    Dislikes: {library.places[1].votes[1]}
                    </Typography>
                    <Typography variant='body2' sx={{ mb: 0.5, fontWeight: 600, color: 'text.primary' }}>
                    {library.places[1].address}
                    </Typography>
                    

                </Box>

                </Box>

                <Box
                sx={{
                    width: '100%',
                    display: 'flex',
                    flexWrap: 'wrap',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                }}
                >
                <Box sx={{ marginRight: 2, display: 'flex', flexDirection: 'column' }}>
                    <Typography variant='h4' sx={{ mb: 0.5, fontWeight: 600, color: 'text.primary' }}>
                    {library.places[2].isBest ? <TrophyImg alt='trophy' src='/images/misc/trophy.png' /> : null} {library.places[2].name}
                    </Typography>
                    <Typography variant='body2' sx={{ mb: 0.5, fontWeight: 600, color: 'text.primary' }}>
                    Likes: {library.places[2].votes[0]}
                    </Typography>
                    <Typography variant='body2' sx={{ mb: 0.5, fontWeight: 600, color: 'text.primary' }}>
                    Dislikes: {library.places[2].votes[1]}
                    </Typography>
                    <Typography variant='body2' sx={{ mb: 0.5, fontWeight: 600, color: 'text.primary' }}>
                    {library.places[2].address}
                    </Typography>

                </Box>

                </Box>
                
            </Box>
            
            </CardContent>
        </Card>
    </Grid>

      

    </Grid>
  )
}

export default Results