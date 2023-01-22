// ** Icon imports
import Login from 'mdi-material-ui/Login'
import AccountGroup from 'mdi-material-ui/AccountGroup'


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
      icon: AccountGroup,
      path: '/create',
      openInNewTab: false
    }
  ]
}

export default navigation
