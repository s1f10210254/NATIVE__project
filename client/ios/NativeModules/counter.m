//#import "React/RCTBridgeModule.h"
//#import "React/RCTEventEmitter.h"
//
//@interface RCT_EXTERN_MODULE(Counter, RCTEventEmitter)
//@end
#import <Foundation/Foundation.h>
#import <React/RCTBridgeModule.h>

@interface RCT_EXTERN_MODULE(Counter, NSObject)
  RCT_EXTERN_METHOD(add)
@end
