import Foundation
import CoreLocation
import React

@objc(LocationModule)
class LocationModule: NSObject, CLLocationManagerDelegate{
  var locationManager: CLLocationManager?
  var locationCallback: RCTResponseSenderBlock?

  @objc func requestLocation(_ callback: @escaping RCTResponseSenderBlock){
    if CLLocationManager.locationServicesEnabled() {
        self.locationManager = CLLocationManager()
        self.locationManager?.delegate = self
        self.locationManager?.requestWhenInUseAuthorization()
        self.locationManager?.startUpdatingLocation()
        self.locationCallback = callback
    } else {
        print("Location services are not enabled")
    }
  }

  func locationManager(_ manager: CLLocationManager, didUpdateLocations locations: [CLLocation]) {
    if let location = locations.first{
      print("Location updated: \(location)")
      locationCallback?([location.coordinate.latitude, location.coordinate.longitude])
      locationManager?.stopUpdatingLocation()
    }else{
      print("No location available")
    }
  }

  func locationManager(_ manager: CLLocationManager, didFailWithError error: Error) {
      print("Location error: \(error)")
  }

  @objc static func requiresMainQueueSetup() -> Bool {
      return true
  }
}
