import {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import apiClient from '../utils/apiClient';

const HomeScreen = () => {
  const [test, setTest] = useState('これはバックエンドから受け取る予定です');

  const hi = async () => {
    const data = await apiClient.hi.$get().then(null);
    setTest(data);
    console.log('hi', data);
  };

  useEffect(() => {
    hi();
  }, []);
  return (
    <View style={styles.container}>
      <Text>Home Screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default HomeScreen;
