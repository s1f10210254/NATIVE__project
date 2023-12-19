import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import {Text, View} from 'react-native';

const Stack = createStackNavigator();

const AppNavigator = () => {
  const aa = 'a';
  return (
    <View>
      <Text> {aa}</Text>
    </View>
    // <NavigationContainer>
    //   <Stack.Navigator>
    //     <Stack.Screen name="Home" component={HomeScreen} />
    //   </Stack.Navigator>
    // </NavigationContainer>
  );
};

export default AppNavigator;
