import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { useEffect, useState } from "react";

/**
 * [Component] Slider : 공연 포스터 auto play 캐러셀
 */
function Slider(props) {
  // 현재 공연 일정이 얼마 남지 않은 공연 리스트 저장하는 state
  const [concerts, setConcerts] = useState([]);

  // async await 로 concert 데이터 가져오기
  async function getMovies() {
    const json = await (await fetch("dummyData/movies.json")).json();
    setConcerts(json);
  }
  useEffect(() => {
    getMovies();
    console.log(concerts);
  }, []);

  return (
    <Swiper
      modules={[Navigation, Pagination, Autoplay]}
      navigation
      autoplay={{ delay: 2000 }}
      spaceBetween={50}
      slidesPerView={3}
      onSwiper={(swiper) => {
        console.log(swiper);
      }}
    >
      {concerts.map((item, index) => (
        <SwiperSlide key={item.title}>
          {item.url != null ? (
            <img src={item.url} alt="url" />
          ) : (
            <img width={"100px"} src={"/img/loadImage.png"} alt="" />
          )}
          <h3>
            {item.title} ({item.year})
          </h3>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

export default Slider;
