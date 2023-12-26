//import Foundation
//import React
//
//@objc(Counter)
//class Counter: RCTEventEmitter {
//  private var count = 0 // この行を追加
//
//  @objc(increment)
//  func increment() {
//    count += 1
//    print("count is \(count)")
//    sendEvent(withName: "onIncrement", body: ["count": count])
//  }
//  @objc override class func moduleName() -> String! {
//          return "Counter"
//      }
//
//  override func supportedEvents() -> [String]! {
//    return ["onIncrement"]
//  }
//  
//  @objc override static func requiresMainQueueSetup() -> Bool {
//    return true
//  }
//}
//
import Foundation

@objc(Counter)
class Counter: NSObject {
  private var count = 0

  @objc
  func add() {
    count += 1
    print("count is \(count)")
  }
}
