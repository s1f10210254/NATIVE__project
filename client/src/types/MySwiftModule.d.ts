import 'react-native';
declare module 'react-native' {
  interface NativeModulesStatic {
    MySwiftModule: {
      exampleMethod(callback: (result: string) => void): void;
      multiply(a: number, b: number): Promise<number>;
    };
    LocationModule: {
      requestLocation(callback: (result: [number, number]) => void): void;
    };
  }
}
