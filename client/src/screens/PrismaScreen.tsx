import {Text, View} from 'react-native';
import apiClient from '../utils/apiClient';
import {useEffect, useState} from 'react';
import {RootStackParamList} from '../utils/ParamList';
import {StackNavigationProp} from '@react-navigation/stack';

type PrismaScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Prisma'
>;

type Props = {
  navigation: PrismaScreenNavigationProp;
};

const PrismaScreen = ({navigation}: Props) => {
  type user = {
    id: string;
  }[];
  const [text, setText] = useState<user | null>(null);
  const getUser = async () => {
    const id = await apiClient.prisma.$get().catch(null);
    setText(id);
  };
  useEffect(() => {
    getUser();
  }, []);
  return (
    <View>
      {text && text.map((user, index) => <Text key={index}>{user.id}</Text>)}
    </View>
  );
};

export default PrismaScreen;
