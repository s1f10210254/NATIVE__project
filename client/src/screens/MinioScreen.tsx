import {useEffect, useState} from 'react';
import {MediaType, launchImageLibrary} from 'react-native-image-picker';
import RNFS from 'react-native-fs';
import {Alert, Button, Image, ScrollView, View} from 'react-native';
import apiClient from '../utils/apiClient';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../utils/ParamList';

type MinioScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Minio'
>;

type Props = {
  navigation: MinioScreenNavigationProp;
};
const MinioScreen = ({navigation}: Props) => {
  const [minioPhotoUrl, setMniophotoUrl] = useState<string[] | null>(null);
  const [imageBase64, setImageBase64] = useState<string | null>(null);
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
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
          const uri = response.assets[0].uri;
          if (uri === undefined) return;
          // setImageUri(uri);
          try {
            const base64 = await RNFS.readFile(uri, 'base64');
            setImageBase64(base64);
          } catch (error) {
            Alert.alert('エラー', '画像の読み込みに失敗しました');
          }
        }
      }
    });
  };

  const uploadPhoto = async () => {
    if (!imageBase64) {
      Alert.alert('写真を選択してください');
      return;
    }
    try {
      const response = await apiClient.minio.$post({
        body: {base64: imageBase64},
      });
      Alert.alert('アップロード成功', `URL: ${response.url}`);
      setImageBase64(null);
      getMinioUrl();
    } catch (error) {
      console.error(error);
      Alert.alert('アップロードに失敗しました');
    }
  };

  // const uploadPhoto1 = async () => {
  //   if (!imageUri) {
  //     Alert.alert('写真を選択してください');
  //     return;
  //   }
  //   try {
  //     const resp = await fetch(imageUri);
  //     const blob = await resp.blob();
  //     console.log(blob);
  //     const response = await apiClient.minioBlob.$post({
  //       body: {blob: blob},
  //     });
  //     Alert.alert('アップロード成功', `URL: ${response}`);
  //     setImageUri('');
  //     getMinioUrl();
  //   } catch (error) {
  //     console.error(error);
  //     Alert.alert('アップロードに失敗しました');
  //   }
  // };

  const getMinioUrl = async () => {
    const minioURL = await apiClient.minio.$get().catch(null);
    setMniophotoUrl(minioURL);
  };

  useEffect(() => {
    getMinioUrl();
  }, []);

  return (
    <ScrollView style={{flex: 1}}>
      <Button title="写真を選択" onPress={selectPhoto} />
      {imageBase64 && (
        <Image
          source={{uri: `data:image/jpeg;base64, ${imageBase64}`}}
          style={{width: 200, height: 200}}
        />
      )}
      {/* {imageUri && (
        <Image source={{uri: imageUri}} style={{width: 200, height: 200}} />
      )} */}
      <Button title="アップロード" onPress={uploadPhoto} />

      <View style={{alignItems: 'center', justifyContent: 'center'}}>
        {minioPhotoUrl &&
          minioPhotoUrl.map((url, index) => (
            <Image
              key={index}
              source={{uri: url}}
              style={{width: 100, height: 100}}
            />
          ))}
      </View>
    </ScrollView>
  );
};

export default MinioScreen;
