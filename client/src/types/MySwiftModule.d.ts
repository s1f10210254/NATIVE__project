import 'react-native';

export interface exampleMethodInterface {
  (callback: (result: string) => void): void;
}
declare module 'react-native' {
  interface NativeModuleStatic {
    exampleMethod: exampleMethodInterface;
  }
}
