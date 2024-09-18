import React, { useRef, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import QrScanner from "qr-scanner";
import styles from "./Scanner.module.css";
import axios from "axios";

function Scanner({ concertId }) {
  const [data, setData] = useState("No result");
  const [scanSuccess, setScanSuccess] = useState(false);

  const videoRef = useRef(null);

  const handleScan = async (result) => {
    setData(result);
    try {
      const response = await axios.get("http://localhost:3001/reservations", {
        rsv_uuid: data,
      });
      if (response.data.success) {
        setScanSuccess(true);
      }
      if (response.status === 404) {
        setScanSuccess(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const qrScanner = new QrScanner(videoRef.current, handleScan, {
      onDecodeError: (error) => console.error(error),
      highlightScanRegion: true,
    });

    qrScanner.start();

    return () => {
      qrScanner.stop();
    };
  }, []);
  return (
    <div className={styles.scannerContainer}>
      <p>{concertId}번</p>
      <div className={styles.videoBox}>
        {QrScanner.hasCamera() ? (
          <video ref={videoRef} className={styles.video} />
        ) : (
          <div className={styles.noCameraDetected}>No Camera Detected.</div>
        )}
      </div>
      <p>스캔 결과: {data}</p>
      {scanSuccess ? <div>success!</div> : <div>failed!</div>}
    </div>
  );
}

export default Scanner;
