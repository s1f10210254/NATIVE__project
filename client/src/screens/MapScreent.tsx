import {StackNavigationProp} from '@react-navigation/stack';
import {StyleSheet, Text, View} from 'react-native';
import MapView from 'react-native-maps';

type RootStackParamList = {
  Home: undefined;
  Map: undefined;
};

type MapScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Map'>;

type Props = {
  navigation: MapScreenNavigationProp;
};

const MapScreen = ({navigation}: Props) => {
  return (
    <View style={styles.container}>
      <MapView style={styles.map} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  map: {
    width: '100%',
    height: '100%',
  },
});

export default MapScreen;
