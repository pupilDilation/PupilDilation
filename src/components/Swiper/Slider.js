import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { useEffect, useState } from "react";

function Slider(props) {
  const [concerts, setConcerts] = useState([]);

  async function getMovies() {
    const json = await (await fetch("dummyData/movies.json")).json();
    setConcerts([json]);
    console.log(concerts);
  }

  useEffect(() => {
    getMovies();
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
      {concerts.map((item, index) => {
        <SwiperSlide>
          <h3>{item.title}</h3>
          <p>{item.plot}</p>
        </SwiperSlide>;
      })}
    </Swiper>
  );
}

export default Slider;
