/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import axios from 'axios';
import React, {useEffect, useState} from 'react';
import type {PropsWithChildren} from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
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

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const [test, setTest] = useState('hiからくる');
  const hi = async () => {
    const data = await apiClient.hi.$get().then(null);
    setTest(data);
    console.log('hi', data);
  };

  type Photo = {
    title: string;
    url: string;
    description?: string;
  };
  type MinioResponse = {
    photos: Photo[];
  };

  const [minioContent, setMinioContent] = useState<MinioResponse | null>(null);

  const minio = async () => {
    const minio = await apiClient.minio.$get().catch(null);
    setMinioContent(minio);
  };

  useEffect(() => {
    hi();
    minio();
  }, []);
  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <Header />
        <View
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
          }}>
          <Text style={{textAlign: 'center'}}>{test}</Text>
          {minioContent &&
            minioContent.photos.map((photo, index) => (
              <View key={index}>
                <Text>{photo.title}</Text>
                <Image
                  source={{uri: photo.url}}
                  style={{width: 100, height: 100}}
                />
                <Text>{photo.description}</Text>
              </View>
            ))}

          <LearnMoreLinks />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

// const styles = StyleSheet.create({
//   sectionContainer: {
//     marginTop: 32,
//     paddingHorizontal: 24,
//   },
//   sectionTitle: {
//     fontSize: 24,
//     fontWeight: '600',
//   },
//   sectionDescription: {
//     marginTop: 8,
//     fontSize: 18,
//     fontWeight: '400',
//   },
//   highlight: {
//     fontWeight: '700',
//   },
// });

export default App;
