
import { createStackNavigator, createAppContainer } from "react-navigation";
import Dashboard from './pages/Dashboard'
import Voting from './pages/Voting'
import Results from './pages/Results'
import Register from './pages/Register'

const AppNavigator = createStackNavigator({
  Dashboard: {
    screen: Dashboard
  },
  Voting: {
    screen: Voting
  },
  Results: {
    screen: Results
  },
  Register: {
    screen: Register
  }
}, {
  initialRouteName: 'Dashboard'
});

export default createAppContainer(AppNavigator);

