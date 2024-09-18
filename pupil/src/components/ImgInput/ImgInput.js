import axios from "axios";
import styles from "./ImgInput.module.css";
import { useState } from "react";

function ImgInput({ imgUrl, setImgUrl }) {
  const rebuildUrl = (url) => {
    const arr = url.split("/");
    return "http://118.41.71.215:3001/images/" + arr[arr.length - 1];
  };

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image", file);

    try {
      const res = await axios.post(
        "http://118.41.71.215:3001/upload",
        formData
      );
      setImgUrl(rebuildUrl(res.data.imageUrl));
      console.log(imgUrl);
    } catch (error) {
      console.error("Error uploading image: ", error);
      alert("img uploading error : ", error);
    }
  };

  return (
    <div className={styles.imgInputBox}>
      <label htmlFor="img" className={styles.imgInputLabel}>
        {imgUrl ? (
          <img src={imgUrl} alt="img" />
        ) : (
          <img src="/img/upload-image.png" alt="업로드" />
        )}
      </label>
      <input
        id="img"
        type="file"
        accept="image/*"
        className={styles.imgInput}
        onChange={handleUpload}
      />
    </div>
  );
}

export default ImgInput;
