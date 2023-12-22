import {StackNavigationProp} from '@react-navigation/stack';
import {Platform, StyleSheet, Text, View} from 'react-native';
import MapView from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import {useEffect, useState} from 'react';

type RootStackParamList = {
  Home: undefined;
  Map: undefined;
};

type MapScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Map'>;

type Props = {
  navigation: MapScreenNavigationProp;
};

const MapScreen = ({navigation}: Props) => {
  const [position, setPosition] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  useEffect(() => {
    const requestLocationPermisssion = async () => {
      if (Platform.OS === 'ios') {
        const auth = await Geolocation.requestAuthorization('whenInUse');
        if (auth === 'granted') {
          Geolocation.getCurrentPosition(
            position => {
              setPosition({
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              });
            },
            error => {
              console.log(error.code, error.message);
              // console.error(error);
            },
            {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
          );
        } else {
          console.log('Androidの処理');
        }
      }
    };
    requestLocationPermisssion();
  }, []);
  return (
    <View style={styles.container}>
      <MapView style={styles.map} region={position} showsUserLocation={true} />
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
