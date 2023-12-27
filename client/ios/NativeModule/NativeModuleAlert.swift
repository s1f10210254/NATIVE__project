import Foundation
import UIKit

@objc(NativeModuleAlert)
class NativeModuleAlert: NSObject, RCTBridgeModule{
  
  static func moduleName() -> String!{
    return "NativeModuleAlert";
  }
  
  static func requireMainQueueSetup () -> Bool {
    return true;
  }
  
  
  @objc
  func ShowAlert(_ message:NSString, duration:Double) -> Void {
    let alert = UIAlertController(title:nil, message: message as String, preferredStyle: .alert);
    let seconds:Double = duration;
    alert.view.backgroundColor = .blue
    alert.view.alpha = 0.5
    alert.view.layer.cornerRadius = 14
    
    DispatchQueue.main.async {
      (UIApplication.shared.delegate as? AppDelegate)?.window.rootViewController?.present(alert, animated: true, completion: nil);
    }
    
    DispatchQueue.main.asyncAfter(deadline: DispatchTime.now() + seconds, execute: {
      alert.dismiss(animated: true, completion: nil);
    })
  }
}
