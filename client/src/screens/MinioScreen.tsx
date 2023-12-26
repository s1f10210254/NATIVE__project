import {useEffect, useState} from 'react';
import {MediaType, launchImageLibrary} from 'react-native-image-picker';
import RNFS from 'react-native-fs';
import {Alert, Button, Image, ScrollView, View} from 'react-native';
import apiClient from '../utils/apiClient';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../utils/ParamList';
import {base_URL} from '@env';

type MinioScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Minio'
>;

type Props = {
  navigation: MinioScreenNavigationProp;
};
const MinioScreen = ({navigation}: Props) => {
  const [minioPhotoUrl, setMniophotoUrl] = useState<string[] | null>(null);
  const [select, setSelect] = useState<string | null>(null);

  const uploadToS3 = async (fileUrl: string, presignedUrl: string) => {
    const response = await fetch(fileUrl);
    const blob = await response.blob();

    await fetch(presignedUrl, {
      method: 'PUT',
      body: blob,
    });
  };

  const selectPhoto = async () => {
    launchImageLibrary({mediaType: 'photo'}, async response => {
      if (!response.didCancel && response.assets && response.assets[0].uri) {
        const fileUri = response.assets[0].uri;
        setSelect(fileUri);
      }
    });
  };
  const upload = async () => {
    if (!select) {
      Alert.alert('写真を選択してください');
      return;
    }
    const filename = select?.split('/').pop();
    try {
      const res = await fetch(
        `${base_URL}/api/generate-presigned-url?filename=${filename}`,
      );
      const {url} = await res.json();

      // S3にアップロード
      if (select === null) return;
      await uploadToS3(select, url);
      setSelect('');
      Alert.alert('アップロード成功');
      getMinioUrl();
      console.log('アップロード成功');
    } catch (error) {
      console.error('アップロード失敗', error);
    }
  };

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
      {select && (
        <Image source={{uri: select}} style={{width: 200, height: 200}} />
      )}
      <Button title="アップロード" onPress={upload} />

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
function err(reason: any): PromiseLike<never> {
  throw new Error('Function not implemented.');
}
