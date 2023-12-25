import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../utils/ParamList';
import {Button, StyleSheet, Text, TextInput, View} from 'react-native';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import {useState} from 'react';
import {createAuth} from '../utils/firebase';

type FirebaseScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Firebase'
>;
type Props = {
  navigation: FirebaseScreenNavigationProp;
};

const FirebaseScreen = ({navigation}: Props) => {
  const [user, setUser] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  const signUpWithEmail = async (email: string, password: string) => {
    console.log('createAuth 前');
    const auth = createAuth();
    console.log('createAuth 後');
    try {
      const signUpResult = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );
      const newUser = signUpResult.user.uid;
      setUser(newUser);
    } catch (error) {
      console.error('新規登録失敗', error);
      throw error;
    }
  };

  const createAccount = async () => {
    try {
      setLoginError('');
      await signUpWithEmail(email, password);
    } catch (error) {
      setLoginError('サインアップに失敗しました');
    }
  };
  const [userLogin, setUserLogin] = useState('');
  const [emailLogin, setEmailLogin] = useState('');
  const [passwordLogin, setPasswordLogin] = useState('');
  const [loginErrorLogin, setLoginErrorLogin] = useState('');
  const signInWithEmail = async (email: string, password: string) => {
    const auth = createAuth();
    try {
      const signInResult = await signInWithEmailAndPassword(
        auth,
        email,
        password,
      );
      const userFib = signInResult.user.uid;
      setUserLogin(userFib);
    } catch (error) {
      console.error('ログイン失敗', error);
      throw error; // エラーを再スローして、呼び出し元でハンドリングできるようにする
    }
  };

  const loginEmail = async () => {
    try {
      setLoginError('');
      await signInWithEmail(emailLogin, passwordLogin);
      console.log();
    } catch (error) {
      setLoginErrorLogin('ログインに失敗しました');
    }
  };
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        onChangeText={setEmail}
        value={email}
        placeholder="メールアドレス"
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        onChangeText={setPassword}
        value={password}
        placeholder="パスワード"
        secureTextEntry
      />
      <Button title="新規登録" onPress={createAccount} />
      {loginError && <Text>{loginError}</Text>}
      <Text>uid:{user}</Text>
      <TextInput
        style={styles.input}
        onChangeText={setEmailLogin}
        value={emailLogin}
        placeholder="メールアドレス"
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        onChangeText={setPasswordLogin}
        value={passwordLogin}
        placeholder="パスワード"
        secureTextEntry
      />
      <Button title="ログイン" onPress={loginEmail} />
      {loginError && <Text>{loginErrorLogin}</Text>}
      <Text>uid:{userLogin}</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  input: {
    width: '100%',
    marginVertical: 10,
    padding: 15,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
  },
});
export default FirebaseScreen;
