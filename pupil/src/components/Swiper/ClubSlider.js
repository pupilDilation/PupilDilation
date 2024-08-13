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

  const handleClubListClick = (clubId) => {
    navigate(`/club/${clubId}`);
  };

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
      navigation
      pagination={{ clickable: true }}
    >
      {clubs.length > 0 ? (
        clubs.map((item) => (
          <SwiperSlide
            key={item.club_id}
            className={styles.swiperSlide}
            onClick={() => handleClubListClick(item.club_id)}
          >
            <ClubSlide item={item} />
          </SwiperSlide>
        ))
      ) : (
        <SwiperSlide>
          <div>No clubs available</div>
        </SwiperSlide>
      )}
    </Swiper>
  );
}

export default ClubSlider;
