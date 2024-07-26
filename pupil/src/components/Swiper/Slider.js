import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Virtual } from "swiper/modules";
import "swiper/css";
import styles from "./slider.module.css";
import Slide from "./Slide";
import { useEffect, useState } from "react";
import axios from "axios";

/**
 * [Component] Slider : 공연 포스터 auto play 캐러셀
 */
function Slider() {
  // 현재 공연 일정이 얼마 남지 않은 공연 리스트 저장하는 state
  const [concerts, setConcerts] = useState([]);

  useEffect(() => {
    async function fetchConcerts() {
      try {
        const response = await axios.get("http://localhost:3001/concerts");
        setConcerts(response.data.concerts); // Adjust based on actual response structure
      } catch (error) {
        console.error("Error fetching the JSON data:", error);
      }
    }

    fetchConcerts();
  }, []);
  // async function getConcerts() {
  //   try {
  //     const response = await axios.get("http://localhost:3001/concerts");
  //     console.log("API Response:", response.data);
  //     setConcerts(response.data);
  //   } catch (error) {
  //     console.error("Error fetching the JSON data:", error);
  //   }
  // }

  // module.css 적용이 불가능한 Swiper 컴포넌트의 스타일 obj
  const SWIPER_STYLE = {
    width: "100%",
    marginTop: "15px",
    height: "auto",
  };

  return (
    <Swiper
      modules={[Navigation, Pagination]}
      autoHeight
      spaceBetween={15}
      slidesPerView={3}
      style={SWIPER_STYLE}
    >
      {concerts.map((item) => (
        <SwiperSlide key={item.concert_id} className={styles.swiperSlide}>
          <Slide item={item} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

export default Slider;
