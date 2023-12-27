// ARView.swift
import UIKit
import ARKit

class ARView: UIView {
    private var sceneView: ARSCNView!

    override init(frame: CGRect) {
        super.init(frame: frame)
        setupSceneView()
    }
    
    required init?(coder aDecoder: NSCoder) {
        super.init(coder: aDecoder)
        setupSceneView()
    }
    
    private func setupSceneView() {
        sceneView = ARSCNView(frame: self.bounds)
        addSubview(sceneView)
        sceneView.delegate = self
        sceneView.showsStatistics = true

        let configuration = ARWorldTrackingConfiguration()
        sceneView.session.run(configuration)
    }

    func pauseSession() {
        sceneView.session.pause()
    }
}

extension ARView: ARSCNViewDelegate {
    // ARSCNViewDelegateのメソッドをここに追加
}

