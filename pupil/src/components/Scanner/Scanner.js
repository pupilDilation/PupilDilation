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
    setData(result.data);
    try {
      const response = await axios.get(
        "http://cndlsrb2739.iptime.org:3000/reservations",
        {
          rsv_uuid: data,
        }
      );
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

  const handleScan2 = async (result) => {
    setData(result.data);
  };

  const checkScanner = async (uuid) => {
    try {
      const res = await axios.get(
        `http://cndlsrb2739.iptime.org:3000/reservations/scanner/${concertId}/${uuid}`
      );
      if (res.data.concert_id) {
        setScanSuccess(
          res.data.concert_id === Number(concertId) ? true : false
        );
        return;
      } else {
        setScanSuccess(false);
        return;
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    checkScanner(data);
  }, [data]);

  useEffect(() => {
    const qrScanner = new QrScanner(videoRef.current, handleScan2, {
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
      {scanSuccess ? (
        <div className={styles.successMessage}>success!</div>
      ) : (
        <div>공연정보가 일치하지 않거나 존재하지 않는 티켓입니다.</div>
      )}
    </div>
  );
}

export default Scanner;
