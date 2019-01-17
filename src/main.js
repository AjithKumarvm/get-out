
import { createStackNavigator, createAppContainer } from "react-navigation";
import Dashboard from './pages/Dashboard'
import Voting from './pages/Voting'
import Commit from './pages/Commit'
import Register from './pages/Register'

const AppNavigator = createStackNavigator({
  Dashboard: {
    screen: Dashboard
  },
  Voting: {
    screen: Voting
  },
  Commit: {
    screen: Commit
  },
  Register: {
    screen: Register
  }
}, {
  initialRouteName: 'Dashboard'
});

export default createAppContainer(AppNavigator);

