import Foundation
import UIKit

@objc(NativeModuleAlert)
class NativeModuleAlert: NSObject, RCTBridgeModule{
  static func moduleName() -> String!{
      return "NativeModuleAlert";
    }
}
