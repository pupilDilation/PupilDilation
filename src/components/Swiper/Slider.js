import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { useEffect, useState } from "react";

function Slider(props) {
  const currentConcert = async () => {
    let response = await fetch("../data/movies.json");
    let movie = await response.json();
    return movie;
  };

  const [concerts, setConcerts] = useState([]);

  useEffect(() => {
    setConcerts(currentConcert());
    console.log(concerts);
  }, []);

  return (
    <Swiper
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
      {}
    </Swiper>
  );
}

export default Slider;
