import {StackNavigationProp} from '@react-navigation/stack';
import {SetStateAction, useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  NativeModules,
  Button,
  requireNativeComponent,
  Alert,
  ViewStyle,
} from 'react-native';
type RootStackParamList = {
  Home: undefined;
  AR: undefined;
};

type ARScreenNavigationProp = StackNavigationProp<RootStackParamList, 'AR'>;
type Props = {
  navigation: ARScreenNavigationProp;
};

const ARView = requireNativeComponent('ARView');
const ARScreen = ({navigation}: Props) => {
  return (
    <View style={styles.container}>
      <Text>AR</Text>
      <ARView />
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
