import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../utils/ParamList';
import {Text} from 'react-native';

type SwiftScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Swift'
>;
type Props = {
  navigation: SwiftScreenNavigationProp;
};

const SwiftScreen = ({navigation}: Props) => {
  return <Text>Swift</Text>;
};
export default SwiftScreen;
