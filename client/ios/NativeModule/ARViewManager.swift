@objc(ARViewManager)
class ARViewManager: RCTViewManager {
  override static func moduleName() -> String! {
    return "ARView"
  }

  override func view() -> UIView! {
    return ARView()
  }
}

