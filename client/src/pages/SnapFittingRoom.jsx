import React, { useRef, useEffect, useState } from 'react';
import Webcam from 'react-webcam';
import * as poseDetection from '@tensorflow-models/pose-detection';
import '@mediapipe/pose';

const SnapFittingRoom = () => {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  const [detector, setDetector] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initDetector = async () => {
      const model = poseDetection.SupportedModels.BlazePose;
      const detectorConfig = {
        runtime: 'mediapipe',
        solutionPath: 'https://cdn.jsdelivr.net/npm/@mediapipe/pose',
        modelType: 'lite',
      };
      const newDetector = await poseDetection.createDetector(model, detectorConfig);
      setDetector(newDetector);
      setLoading(false);
    };

    initDetector();
  }, []);

  useEffect(() => {
    if (detector) {
      const interval = setInterval(() => {
        detectPose();
      }, 100);

      return () => clearInterval(interval);
    }
  }, [detector]);

  const detectPose = async () => {
    if (webcamRef.current?.video && detector) {
      const poses = await detector.estimatePoses(webcamRef.current.video);
      drawCanvas(poses);
    }
  };

  const drawCanvas = (poses) => {
    const ctx = canvasRef.current.getContext('2d');
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    if (poses.length > 0) {
      const keypoints = poses[0].keypoints;

      const leftShoulder = keypoints.find(p => p.name === 'left_shoulder');
      const rightShoulder = keypoints.find(p => p.name === 'right_shoulder');
      const leftHip = keypoints.find(p => p.name === 'left_hip');
      const rightHip = keypoints.find(p => p.name === 'right_hip');

      if (leftShoulder && rightShoulder && leftHip && rightHip) {
        const centerX = (leftShoulder.x + rightShoulder.x) / 2;
        const centerY = (leftShoulder.y + leftHip.y) / 2;

        const width = Math.abs(rightShoulder.x - leftShoulder.x) * 1.5;
        const height = Math.abs(rightHip.y - leftShoulder.y) * 1.5;

        const shirt = new Image();
        shirt.src = '/shirt_overlay.png'; // Ton T-shirt transparent (dans dossier public)
        shirt.onload = () => {
          ctx.drawImage(shirt, centerX - width / 2, centerY - height / 2, width, height);
        };
      }
    }
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '2rem' }}>
      <h1>🪞 Essayage 3D Live - Snap Style</h1>

      <div style={{ position: 'relative', width: '360px', margin: 'auto' }}>
        <Webcam
          ref={webcamRef}
          mirrored
          videoConstraints={{ width: 360, height: 480 }}
          style={{ width: '360px', height: '480px', borderRadius: '20px' }}
        />
        <canvas
          ref={canvasRef}
          width="360"
          height="480"
          style={{ position: 'absolute', top: 0, left: 0 }}
        />
      </div>

      {loading && <p>Chargement du modèle de détection... ⏳</p>}
    </div>
  );
};

export default SnapFittingRoom;
