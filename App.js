/* eslint-disable react-native/no-inline-styles */
import * as React from 'react';
import {View, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import UserContextProvider from './src/contexts/UserContext';

import MainStack from './src/stacks/MainStack';

function App() {
  return (
    <UserContextProvider>
      <NavigationContainer>
        <MainStack />
      </NavigationContainer>

    </UserContextProvider>

  );
}
export default App;
