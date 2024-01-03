import {useNavigation} from '@react-navigation/native';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

const items = [
  {label: 'menu1', screen: 'Screen1'},
  {label: 'menu2', screen: 'Screen2'},
  {label: 'menu3', screen: 'Screen3'},
  {label: 'menu4', screen: 'Screen4'},
  {label: 'menu5', screen: 'Screen5'},
];
// type RootStackParamList = {
//   menu1: undefined;
//   menu2: undefined;
//   menu3: undefined;
//   menu4: undefined;
//   menu5: undefined;
// };
const UnderlineBar = () => {
  const navigation = useNavigation<any>();

  const handlePress = (screen: string) => {
    navigation.navigate(screen);
  };

  return (
    <View style={styles.container}>
      {items.map((item, index) => (
        <TouchableOpacity
          key={index}
          onPress={() => handlePress(item.screen)}
          style={styles.button}>
          <Text style={styles.text}>{item.label}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default UnderlineBar;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#fff',
    padding: 10,
  },
  button: {
    // スタイルをここに追加
  },
  text: {
    textDecorationLine: 'underline',
    // その他のテキストスタイルをここに追加
  },
});
