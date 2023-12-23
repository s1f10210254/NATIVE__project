import {StackNavigationProp} from '@react-navigation/stack';
import React from 'react';
import {View, Button} from 'react-native';
import {RootStackParamList} from '../utils/ParamList';

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
      <Button
        title="Go to Animate Screen"
        onPress={() => navigation.navigate('Animate')}
      />
      <Button
        title="Go to Map Screen"
        onPress={() => navigation.navigate('Map')}
      />
      <Button
        title="Go to AR Screen"
        onPress={() => navigation.navigate('AR')}
      />
    </View>
  );
};

export default HomeScreen;
