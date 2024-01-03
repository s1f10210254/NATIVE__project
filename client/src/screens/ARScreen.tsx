import {StackNavigationProp} from '@react-navigation/stack';
import {useState} from 'react';
import {Button, NativeModules, StyleSheet, Text, View} from 'react-native';
import {RootStackParamList} from '../utils/ParamList';

const {LocationModule, MySwiftModule} = NativeModules;

type ARScreenNavigationProp = StackNavigationProp<RootStackParamList, 'AR'>;
type Props = {
  navigation: ARScreenNavigationProp;
};

const ARScreen = ({navigation}: Props) => {
  const [result, setResult] = useState<number | null>(null);
  const [location, setLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);
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

  const getLocation = () => {
    console.log('Requesting location...');
    LocationModule.requestLocation((result: [number, number]) => {
      const [latitude, longitude] = result; // 結果を分割代入
      console.log('Location:', latitude, longitude);
      setLocation({latitude, longitude});
    });
  };
  return (
    <View style={styles.container}>
      <Text>AR</Text>
      <Button title="Call Swift Method" onPress={handlePress} />
      <Button title="Multiply 6 and 7" onPress={handleMultiply} />
      {result && <Text>Result: {result}</Text>}
      <Button title="Get Location" onPress={getLocation} />
      {location && (
        <Text>
          Latitude: {location.latitude}, Longitude: {location.longitude}
        </Text>
      )}
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
