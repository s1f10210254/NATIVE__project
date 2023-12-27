import {StackNavigationProp} from '@react-navigation/stack';
import {SetStateAction, useEffect, useState} from 'react';
import {StyleSheet, Text, View, NativeModules, Button} from 'react-native';
type RootStackParamList = {
  Home: undefined;
  AR: undefined;
};

type ARScreenNavigationProp = StackNavigationProp<RootStackParamList, 'AR'>;
type Props = {
  navigation: ARScreenNavigationProp;
};

const ARScreen = ({navigation}: Props) => {
  useEffect(() => {
    console.log('NativeModules', NativeModules.NativeModuleAlert);
  }, []);

  return (
    <View style={styles.container}>
      <Text>AR</Text>
      <Button
        onPress={() =>
          NativeModules.NativeModuleAlert.ShowAlert('Hello NativeModule!', 1)
        }
        title="NativeModuleAlert"
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
export default ARScreen;
