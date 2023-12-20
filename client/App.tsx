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

  const [minioContent, setMinioContent] = useState<string[] | null>(null);

  const getminio = async () => {
    const minio = await apiClient.minio.$get().catch(null);
    setMinioContent(minio);
  };
  const [file, setFile] = useState<string | null>(null);

  const [imageBase64, setImageBase64] = useState<string | null>(null);
  const selectPhoto = () => {
    const options = {
      title: 'Select Photo',
      mediaType: 'photos' as MediaType,
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    launchImageLibrary(options, async response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorMessage) {
        console.log('ImagePicker Error: ', response.errorMessage);
      } else {
        if (response.assets && response.assets.length > 0) {
          // const source = {uri: response.assets[0].uri};
          // // ここでstateに写真のデータを保存する
          // setFile(response.assets[0]);
          if (response.assets[0].uri === undefined) return;
          const base64 = await RNFS.readFile(response.assets[0].uri, 'base64');
          // setFile(base64);
          setImageBase64(base64);
        }
      }
    });
  };

  const handleSubmit = async () => {
    if (!imageBase64) {
      Alert.alert('写真を選択してください');
      return;
    }

    // if (file.uri === undefined) return;
    // try {
    //   await apiClient.minio.$post({
    //     body: {uri: file.uri},
    //   });
    // } catch (error) {
    //   console.error(error);
    //   Alert;
    // }
    try {
      // 画像をBase64エンコード
      // const base64 = await RNFS.readFile(file, 'base64');

      // APIにBase64エンコーディングされた画像を送信
      const response = await apiClient.minio.$post({
        body: {base64: imageBase64},
      });

      // アップロード成功のアラートを表示
      Alert.alert('アップロード成功', `URL: ${response.url}`);
      getminio();
    } catch (error) {
      // エラーハンドリング
      console.error(error);
      Alert.alert('アップロードに失敗しました');
    }
  };

  useEffect(() => {
    hi();
    getminio();
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
            minioContent.map((url, index) => (
              <Image
                key={index}
                source={{uri: url}}
                style={{width: 100, height: 100}}
              />
            ))}
          <LearnMoreLinks />
        </View>
        <View>
          <Button title="写真を選択" onPress={selectPhoto} />
          {/* {file && (
            <Image source={{uri: file}} style={{width: 100, height: 100}} />
          )} */}
          {imageBase64 && (
            <Image
              source={{uri: `data:image/jpeg;base64,${imageBase64}`}}
              style={{width: 200, height: 200}}
            />
          )}
          <Button title="アップロード" onPress={handleSubmit} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default App;
