import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Virtual } from "swiper/modules";
import "swiper/css";
import styles from "./slider.module.css";
import Slide from "./Slide";
import { useEffect, useState } from "react";

/**
 * [Component] Slider : 공연 포스터 auto play 캐러셀
 */
function Slider() {
  // 현재 공연 일정이 얼마 남지 않은 공연 리스트 저장하는 state
  const [concerts, setConcerts] = useState([]);

  // async await 로 concert 데이터 가져오기
  async function getMovies() {
    const json = await (await fetch("dummyData/movies.json")).json();
    setConcerts(json);
  }
  useEffect(() => {
    getMovies();
  }, []);

  // module.css 적용이 불가능한 Swiper 컴포넌트의 스타일 obj
  const SWIPER_STYLE = {
    width: "100%",
    marginTop: "15px",
  };

  return (
    <Swiper
      modules={[Navigation, Pagination]}
      autoHeight
      spaceBetween={15}
      slidesPerView={3}
      onSwiper={(swiper) => {
        console.log(swiper);
      }}
      style={SWIPER_STYLE}
    >
      {concerts.map((item, index) => (
        <SwiperSlide key={item.title} className={styles.swiperSlide}>
          <Slide item={item}></Slide>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

export default Slider;
