import {StackNavigationProp} from '@react-navigation/stack';
import {Button, NativeModules, StyleSheet, Text, View} from 'react-native';

const {MySwiftModule} = NativeModules;
type RootStackParamList = {
  Home: undefined;
  AR: undefined;
};

type ARScreenNavigationProp = StackNavigationProp<RootStackParamList, 'AR'>;
type Props = {
  navigation: ARScreenNavigationProp;
};

const ARScreen = ({navigation}: Props) => {
  const handlePress = async () => {
    MySwiftModule.exampleMethod((result: string) => {
      console.log(result);
    });
  };
  return (
    <View style={styles.container}>
      <Text>AR</Text>
      <Button title="Call Swift Method" onPress={handlePress} />
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
