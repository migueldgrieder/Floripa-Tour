import * as React from 'react';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

import HomeScreen from './pages/Home'
import AttractionListScreen from './pages/AttractionsList'
import AttractionDetailsScreen from './pages/AttractionDetails'
import AttractionsFavoritesScreen from './pages/AttractionsFavorites'

const MainNavigator = createStackNavigator({
  Home: {screen: HomeScreen},
  AttractionList: {screen: AttractionListScreen},
  AttractionDetails: {screen: AttractionDetailsScreen},
  AttractionsFavorites: {screen: AttractionsFavoritesScreen},
});
 
const App = createAppContainer(MainNavigator);
export default App;