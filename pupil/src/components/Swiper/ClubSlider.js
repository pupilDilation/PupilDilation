import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import ClubSlide from "./ClubSlide";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styles from "./slider.module.css";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const colors = [
  "#FFADAD",
  "#FFD6A5",
  "#FDFFB6",
  "#CAFFBF",
  "#9BF6FF",
  "#A0C4FF",
  "#BDB2FF",
  "#FFC6FF",
];

function ClubSlider() {
  const navigate = useNavigate();
  const [clubs, setClubs] = useState([]);

  useEffect(() => {
    async function fetchClubs() {
      try {
        const response = await axios.get(`http://localhost:3001/club`);
        setClubs(response.data || []);
      } catch (error) {
        console.error("Error when fetching data: ", error);
      }
    }
    fetchClubs();
  }, []);

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
      slidesPerView={5}
      style={SWIPER_STYLE}
    >
      {clubs.length > 0 ? (
        clubs.map((item) => {
          const randomColor = colors[Math.floor(Math.random() * colors.length)];
          return (
            <SwiperSlide key={item.club_id} className={styles.swiperSlide}>
              <ClubSlide item={item} bgColor={randomColor} />
            </SwiperSlide>
          );
        })
      ) : (
        <SwiperSlide>
          <div>No clubs available</div>
        </SwiperSlide>
      )}
    </Swiper>
  );
}

export default ClubSlider;
