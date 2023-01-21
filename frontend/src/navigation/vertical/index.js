// ** Icon imports
import Login from 'mdi-material-ui/Login'
import AccountDetails from 'mdi-material-ui/AccountDetails'


const navigation = () => {
  return [
    {
      title: 'Join Group',
      icon: Login,
      path: '/join',
      openInNewTab: false
    },
    {
      title: 'Create Group',
      icon: AccountDetails,
      path: '/create',
      openInNewTab: false
    }
  ]
}

export default navigation
