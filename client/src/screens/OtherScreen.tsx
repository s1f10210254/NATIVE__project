import {StackNavigationProp} from '@react-navigation/stack';
import React from 'react';
import {View, Text, Button} from 'react-native';
import {RootStackParamList} from '../utils/ParamList';

type OtherScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Other'
>;

type Props = {
  navigation: OtherScreenNavigationProp;
};
const OtherScreen = ({navigation}: Props) => {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Other Screen</Text>
      <Button title="Go back to Home" onPress={() => navigation.goBack()} />
    </View>
  );
};

export default OtherScreen;
