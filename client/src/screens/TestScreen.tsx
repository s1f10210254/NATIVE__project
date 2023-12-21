import React, {useEffect, useRef} from 'react';
import {Animated, Text, View} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import LinearGradient from 'react-native-linear-gradient';

type RootStackParamList = {
  Home: undefined;
  Test: undefined;
};

type TestScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Test'>;

type Props = {
  navigation: TestScreenNavigationProp;
};

const TestScreen = ({navigation}: Props) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0)).current;
  const moveAnim = useRef(new Animated.ValueXY({x: 0, y: 0})).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();

    Animated.spring(scaleAnim, {
      toValue: 1,
      friction: 4,
      useNativeDriver: true,
    }).start();

    Animated.loop(
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 5000,
        useNativeDriver: true,
      }),
    ).start();

    Animated.sequence([
      Animated.timing(moveAnim, {
        toValue: {x: 100, y: 0},
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(moveAnim, {
        toValue: {x: 0, y: 100},
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(moveAnim, {
        toValue: {x: -100, y: 0},
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(moveAnim, {
        toValue: {x: 0, y: -100},
        duration: 1000,
        useNativeDriver: true,
      }),
    ]).start();
  }, [fadeAnim, scaleAnim, moveAnim, rotateAnim]);

  const rotation = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <LinearGradient
      colors={['#4c669f', '#3b5998', '#192f6a']}
      style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Animated.View
          style={{
            opacity: fadeAnim,
            transform: [
              {scale: scaleAnim},
              {translateX: moveAnim.x},
              {translateY: moveAnim.y},
              {rotate: rotation},
            ],
          }}>
          <Text>Hello</Text>
        </Animated.View>
      </View>
    </LinearGradient>
  );
};

export default TestScreen;
