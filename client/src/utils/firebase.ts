import {initializeApp} from 'firebase/app';
import {Auth, connectAuthEmulator, getAuth} from 'firebase/auth';

let cachedAuth: Auth | undefined;
export const createAuth = () => {
  if (cachedAuth !== undefined) return cachedAuth;
  const auth = getAuth(initializeApp({apiKey: 'fake-api-key'}));
  connectAuthEmulator(auth, 'http://localhost:9099', {disableWarnings: true});
  cachedAuth = auth;
  return auth;
};
