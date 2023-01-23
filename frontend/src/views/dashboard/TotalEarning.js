// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Avatar from '@mui/material/Avatar'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import LinearProgress from '@mui/material/LinearProgress'

// ** Icons Imports
import MenuUp from 'mdi-material-ui/MenuUp'
import DotsVertical from 'mdi-material-ui/DotsVertical'

const data = [
  {
    progress: 75,
    imgHeight: 20,
    title: 'Zipcar',
    color: 'primary',
    amount: '$24,895.65',
    subtitle: 'Vuejs, React & HTML',
    imgSrc: '/images/cards/logo-zipcar.png'
  },
  {
    progress: 50,
    color: 'info',
    imgHeight: 27,
    title: 'Bitbank',
    amount: '$8,650.20',
    subtitle: 'Sketch, Figma & XD',
    imgSrc: '/images/cards/logo-bitbank.png'
  },
  {
    progress: 20,
    imgHeight: 20,
    title: 'Aviato',
    color: 'secondary',
    amount: '$1,245.80',
    subtitle: 'HTML & Angular',
    imgSrc: '/images/cards/logo-aviato.png'
  }
]

const TotalEarning = () => {
  return (
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
              <Typography variant='body2' sx={{ mb: 0.5, fontWeight: 600, color: 'text.primary' }}>
                Restaurant Name: 
              </Typography>
              <Typography variant='caption'>dislike</Typography>
            </Box>

            
          </Box>
        </Box>
      
      </CardContent>
    </Card>
  )
}

export default TotalEarning
