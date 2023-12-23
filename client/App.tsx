/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect, useState} from 'react';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import HomeScreen from './src/screens/HomeScreen';
import OtherScreen from './src/screens/OtherScreen';
import MinioScreen from './src/screens/MinioScreen';
import MapScreen from './src/screens/MapScreent';
import ARScreen from './src/screens/ARScreen';
import AnimateScreen from './src/screens/AnimateScreen';
import PrismaScreen from './src/screens/PrismaScreen';

function App(): React.JSX.Element {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Other" component={OtherScreen} />
        <Stack.Screen name="Minio" component={MinioScreen} />
        <Stack.Screen name="Animate" component={AnimateScreen} />
        <Stack.Screen name="Map" component={MapScreen} />
        <Stack.Screen name="AR" component={ARScreen} />
        <Stack.Screen name="Prisma" component={PrismaScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
