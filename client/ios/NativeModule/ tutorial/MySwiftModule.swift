//swiftで基本的なデータ型やコレクションなどを使用するための標準ライブラリ
import Foundation
//ReactNativeのモジュールをswiftで使用できるようにしている
import React
//このクラスがObjecttive-Cからアクセスできるようにしている
@objc(MySwiftModule)
//"NSObject"を継承したクラスを定義。これはObjective-Cとの互換性のために必要
class MySwift: NSObject{
  //ReactNativeから呼び出せるメソッドを定義。このメソッドはReactNativeからのコールバックを受け取る
  @objc func exampleMethod(_ callback: RCTResponseSenderBlock){
    let result = "Hello from Swift"
    //処理の結果をReactNativeのtypescriptに返す
    callback([result])
  }
  
  @objc func multiply(_ a:Int, b:Int, resolver resolve: @escaping RCTPromiseResolveBlock, rejecter reject: @escaping RCTPromiseRejectBlock){
    let result = a * b
    resolve(result)
  }
  //ReactNativeがこのモジュールをメインスレッドでセットアップする必要があるかどうかを示す。
  @objc static func requiresMainQueueSetup()-> Bool{
    return true
  }
}

