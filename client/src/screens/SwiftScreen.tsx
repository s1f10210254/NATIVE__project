import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../utils/ParamList';
import {Button, NativeModules, StyleSheet, Text, View} from 'react-native';
import {useState} from 'react';

type SwiftScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Swift'
>;
type Props = {
  navigation: SwiftScreenNavigationProp;
};

const SwiftScreen = ({navigation}: Props) => {
  const [result, setResult] = useState<number | null>(null);

  const {MySwiftModule} = NativeModules;
  const handlePress = async () => {
    MySwiftModule.exampleMethod((result: string) => {
      console.log(result);
    });
  };

  const handleMultiply = async () => {
    try {
      const multiplyResult = await MySwiftModule.multiply(6, 7);
      console.log(multiplyResult);
      setResult(multiplyResult);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <View style={styles.container}>
      <Text>Swift</Text>
      <Button title="Call Swift Method" onPress={handlePress} />
      <Button title="Multiply 6 and 7" onPress={handleMultiply} />
      {result && <Text>Result: {result}</Text>}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
export default SwiftScreen;
