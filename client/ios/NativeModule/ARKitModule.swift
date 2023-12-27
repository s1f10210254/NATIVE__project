import Foundation
import UIKit

@objc(ARKitModule)
class ARKitModule: NSObject {
  
  @objc func startARSession(resolve: @escaping RCTPromiseResolveBlock, rejecter reject: @escaping RCTPromiseRejectBlock) {
    DispatchQueue.main.async { [weak self] in
      guard let self = self else {
        reject("AR_ERROR", "The ARKitModule is no longer available.", nil)
        return
      }

      if let rootViewController = UIApplication.shared.delegate?.window??.rootViewController {
        let arViewController = ARViewController()
        rootViewController.present(arViewController, animated: true, completion: {
          resolve(nil)
        })
      } else {
        reject("AR_ERROR", "Unable to get root view controller", nil)
      }
    }
  }
}

