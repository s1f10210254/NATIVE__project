import {StackNavigationProp} from '@react-navigation/stack';
import {useState} from 'react';
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
  const [result, setResult] = useState<number | null>(null);
  const handlePress = async () => {
    MySwiftModule.exampleMethod((result: string) => {
      console.log(result);
    });
  };

  const handleMultiply = async () => {
    try {
      const multiplyResult = await MySwiftModule.multiply(6, 7);
      setResult(multiplyResult);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <View style={styles.container}>
      <Text>AR</Text>
      <Button title="Call Swift Method" onPress={handlePress} />
      <Button title="Multiply 6 and 7" onPress={handleMultiply} />
      {result && <Text>Result: {result}</Text>}
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
