/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import axios, {all} from 'axios';
import React, {useEffect, useState} from 'react';
import type {PropsWithChildren} from 'react';
import {Asset, launchImageLibrary, MediaType} from 'react-native-image-picker';
import RNFS from 'react-native-fs';
import {
  Alert,
  Button,
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import apiClient from './src/utils/apiClient';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import HomeScreen from './src/screens/HomeScreen';
import OtherScreen from './src/screens/OtherScreen';
import MinioScreen from './src/screens/MinioScreen';

function App(): React.JSX.Element {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Other" component={OtherScreen} />
        <Stack.Screen name="Minio" component={MinioScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
