import React, { useRef, useState, useEffect } from "react";
import QrScanner from "qr-scanner";

function Scanner(props) {
  const [data, setData] = useState("No result");
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
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>QR 코드 스캐너</h1>
      <div style={{ width: "300px", margin: "auto" }}>
        <video ref={videoRef} style={{ width: "100%" }} />
      </div>
      <p>스캔 결과: {data}</p>
    </div>
  );
}

export default Scanner;
