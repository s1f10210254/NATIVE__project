//ReactNativeのモジュール機能をインポート
#import <React/RCTBridgeModule.h>
//Swiftで定義した"MySwiftModule"クラスをReactNativeに公開するための宣言
@interface RCT_EXTERN_MODULE(MySwiftModule, NSObject)
//Swiftで定義したexampleMethodをReactNativeで使えるようにエクスポート
RCT_EXTERN_METHOD(exampleMethod:(RCTResponseSenderBlock)callback)

RCT_EXTERN_METHOD(multiply:(NSInteger)a b:(NSInteger)b resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject)
@end
