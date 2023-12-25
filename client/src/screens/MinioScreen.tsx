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
  // const [imageBase64, setImageBase64] = useState<string | null>(null);
  const [imageUri, setImageUri] = useState<string | null>(null);
  // const selectPhoto = () => {
  //   const options = {
  //     title: 'Select Photo',
  //     mediaType: 'photos' as MediaType,
  //     storageOptions: {
  //       skipBackup: true,
  //       path: 'images',
  //     },
  //   };
  //   launchImageLibrary(options, async response => {
  //     if (response.didCancel) {
  //       console.log('User cancelled image picker');
  //     } else if (response.errorMessage) {
  //       console.log('ImagePicker Error: ', response.errorMessage);
  //     } else {
  //       if (response.assets && response.assets.length > 0) {
  //         const uri = response.assets[0].uri;
  //         if (uri === undefined) return;
  //         // setImageUri(uri);
  //         try {
  //           const base64 = await RNFS.readFile(uri, 'base64');
  //           setImageBase64(base64);
  //         } catch (error) {
  //           Alert.alert('エラー', '画像の読み込みに失敗しました');
  //         }
  //       }
  //     }
  //   });
  // };

  // const uploadPhoto = async () => {
  //   if (!imageBase64) {
  //     Alert.alert('写真を選択してください');
  //     return;
  //   }
  //   try {
  //     const response = await apiClient.minio.$post({
  //       body: {base64: imageBase64},
  //     });
  //     Alert.alert('アップロード成功', `URL: ${response.url}`);
  //     setImageBase64(null);
  //     getMinioUrl();
  //   } catch (error) {
  //     console.error(error);
  //     Alert.alert('アップロードに失敗しました');
  //   }
  // };

  // const uploadPhoto1 = async () => {
  //   if (!imageBase64) {
  //     Alert.alert('写真を選択してください');
  //     return;
  //   }
  //   try {
  //     // const response = await fetch(imageUri);
  //     // const blob = await response.blob();
  //     // const formData = new FormData();
  //     // formData.append('file', blob);

  //     const body = JSON.stringify({image: imageBase64});

  //     fetch(`${base_URL}/api/upload`, {
  //       method: 'POST',
  //       // body: formData,
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: body,
  //     })
  //       .then(response => response.json())
  //       .then(data => {
  //         console.log('Upload Success:', data);
  //         getMinioUrl();
  //       })
  //       .catch(err => {
  //         console.error(err);
  //       });
  //   } catch (error) {
  //     console.error(error);
  //     Alert.alert('アップロードに失敗しました');
  //   }
  // };

  const uploadToS3 = async (fileUrl: string, presignedUrl: string) => {
    const response = await fetch(fileUrl);
    const blob = await response.blob();

    await fetch(presignedUrl, {
      method: 'PUT',
      body: blob,
    });
  };
  const handleUpload = async () => {
    launchImageLibrary({mediaType: 'photo'}, async response => {
      if (!response.didCancel && response.assets && response.assets[0].uri) {
        const fileUri = response.assets[0].uri;
        // setImageUri(fileUri);
        const filename = fileUri.split('/').pop();

        try {
          // サーバーに署名付きURLを要求
          const res = await fetch(
            `${base_URL}/api/generate-presigned-url?filename=${filename}`,
          );
          const {url} = await res.json();

          // S3にアップロード
          await uploadToS3(fileUri, url);
          getMinioUrl();
          console.log('アップロード成功');
        } catch (error) {
          console.error('アップロード失敗', error);
        }
      }
    });
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
      {/* <Button title="写真を選択" onPress={selectPhoto} /> */}
      {/* {imageBase64 && (
        <Image
          source={{uri: `data:image/jpeg;base64, ${imageBase64}`}}
          style={{width: 200, height: 200}}
        />
      )} */}
      {imageUri && (
        <Image source={{uri: imageUri}} style={{width: 200, height: 200}} />
      )}
      <Button title="アップロード" onPress={handleUpload} />

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
