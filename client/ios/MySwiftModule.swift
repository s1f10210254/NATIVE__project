//
//  MySwiftModule.swift
//  MyProject
//
//  Created by Hiroki on 2023/12/26.
//

import Foundation
import React

@objc(MySwiftModule)
class MySwiftModule: NSObject, RCTBridgeModule{
  // ReactNativeでmoduleが必要とされる際に必要な関数
  static func  moduleName() -> String! {
    return "MySwiftModule"
  }
  
  // React Nativeから呼び出せるSwiftメソッドの例
  @objc func exampleMethod(_ callback: @escaping RCTResponseSenderBlock){
    // ここにSwiftコードを記述
    let result = "Hello from Swift!"
    callback([NSNull(),result])
  }
  
  // この関数はメインスレッドで実行されるかどうかを指定する（必要に応じて）
  @objc static func requiresMainQueueSetup() -> Bool {
    return false
  }
}
