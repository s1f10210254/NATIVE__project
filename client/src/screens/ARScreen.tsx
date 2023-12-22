import {StackNavigationProp} from '@react-navigation/stack';
import {StyleSheet, Text, View} from 'react-native';

type RootStackParamList = {
  Home: undefined;
  AR: undefined;
};

type ARScreenNavigationProp = StackNavigationProp<RootStackParamList, 'AR'>;
type Props = {
  navigation: ARScreenNavigationProp;
};

const ARScreen = ({navigation}: Props) => {
  return (
    <View style={styles.container}>
      <Text>AR</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
export default ARScreen;
