#import <Foundation/Foundation.h>
#import <React/RCTBridgeModule.h>

@interface RCT_EXTERN_MODULE(NativeModuleAlert, NSObject)
RCT_EXTERN_METHOD(ShowAlert:(NSString *)message duration:(double *)duration)
@end

