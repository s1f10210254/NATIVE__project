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
  const [DBContent, setDBContent] = useState<user | null>(null);
  const [health, setHealth] = useState<
    Record<'server' | 'db', 'ok' | 'ng'> | undefined
  >();
  const healthTest = async () => {
    const data = await apiClient.health.$get();
    setHealth(data);
  };
  const getUser = async () => {
    const id = await apiClient.prisma.$get().catch(null);
    setDBContent(id);
    // console.log(process.env.baseURL);
  };

  useEffect(() => {
    healthTest();
    getUser();
  }, []);
  return (
    <View>
      <Text>health ok?</Text>
      {health && (
        <View>
          <Text>Server Status: {health.server}</Text>
          <Text>Database Status: {health.db}</Text>
        </View>
      )}
      <Text>DB content ↓</Text>
      {DBContent &&
        DBContent.map((user, index) => <Text key={index}>{user.id}</Text>)}
    </View>
  );
};

export default PrismaScreen;
