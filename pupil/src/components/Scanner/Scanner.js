import React, { useRef, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import QrScanner from "qr-scanner";
import styles from "./Scanner.module.css";

function Scanner({ sessionId }) {
  const [data, setData] = useState("No result");
  const [scanSuccess, setScanSuccess] = useState(false);

  const videoRef = useRef(null);

  useEffect(() => {
    const qrScanner = new QrScanner(
      videoRef.current,
      (result) => setData(result.data),
      {
        onDecodeError: (error) => console.error(error),
        highlightScanRegion: true,
      }
    );

    qrScanner.start();

    return () => {
      qrScanner.stop();
    };
  }, []);
  return (
    <div className={styles.scannerContainer}>
      <p>{sessionId}</p>
      <div className={styles.videoBox}>
        {QrScanner.hasCamera() ? (
          <video ref={videoRef} className={styles.video} />
        ) : (
          <div className={styles.noCameraDetected}>No Camera Detected.</div>
        )}
      </div>
      <p>스캔 결과: {data}</p>
    </div>
  );
}

export default Scanner;
