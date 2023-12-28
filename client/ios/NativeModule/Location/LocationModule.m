#import <React/RCTBridgeModule.h>

@interface RCT_EXTERN_MODULE(LocationModule, NSObject)
RCT_EXTERN_METHOD(requestLocation:(RCTResponseSenderBlock)callback)
@end
