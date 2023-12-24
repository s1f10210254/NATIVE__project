import {initializeApp} from 'firebase/app';
import {Auth, connectAuthEmulator, getAuth} from 'firebase/auth';
import {AUTH_EMULATOR_URL} from '@env';
let cachedAuth: Auth | undefined;
export const createAuth = () => {
  if (cachedAuth !== undefined) return cachedAuth;
  const auth = getAuth(initializeApp({apiKey: 'fake-api-key'}));
  connectAuthEmulator(auth, AUTH_EMULATOR_URL, {disableWarnings: true});
  cachedAuth = auth;
  return auth;
};
