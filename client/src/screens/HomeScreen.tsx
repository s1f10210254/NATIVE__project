import {StackNavigationProp} from '@react-navigation/stack';
import React from 'react';
import {View, Button} from 'react-native';
type RootStackParamList = {
  Home: undefined;
  Other: undefined;
  Minio: undefined;
};

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

type Props = {
  navigation: HomeScreenNavigationProp;
};
const HomeScreen = ({navigation}: Props) => {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Button
        title="Go to Other Screen"
        onPress={() => navigation.navigate('Other')}
      />
      <Button
        title="Go to Minio Screen"
        onPress={() => navigation.navigate('Minio')}
      />
    </View>
  );
};

export default HomeScreen;
