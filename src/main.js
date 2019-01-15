
import { createStackNavigator, createAppContainer } from "react-navigation";
import Dashboard from './pages/Dashboard'
import Voting from './pages/Voting'
import Commit from './pages/Commit'

const AppNavigator = createStackNavigator({
  Dashboard: {
    screen: Dashboard
  },
  Voting: {
    screen: Voting
  },
  Commit: {
    screen: Commit
  }
}, {
  initialRouteName: 'Dashboard'
});

export default createAppContainer(AppNavigator);

