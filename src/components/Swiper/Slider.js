import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { useEffect, useState } from "react";

/**
 * [Component] Slider
 */
function Slider(props) {
  // 현재 공연 일정이 얼마 남지 않은 공연 리스트 저장하는 state
  const [concerts, setConcerts] = useState([]);

  // async await 로 concert 데이터 가져오기
  async function getMovies() {
    const json = await (await fetch("dummyData/movies.json")).json();
    setConcerts(json);
  }

  //
  useEffect(() => {
    getMovies();
    console.log(concerts);
  }, []);

  return (
    <Swiper
      observer={true}
      modules={[Navigation, Pagination, Autoplay]}
      navigation
      autoplay={{ delay: 2000 }}
      spaceBetween={50}
      slidesPerView={3}
      onSlideChange={() => {
        console.log("slide change");
      }}
      onSwiper={(swiper) => {
        console.log(swiper);
      }}
    >
      {concerts.map((item, index) => (
        <SwiperSlide key={item.title}>
          <h3>
            {item.title} ({item.year})
          </h3>
          <p>{item.plot}</p>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

export default Slider;
