import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import styles from "./slider.module.css";
import Slide from "./Slide";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { useQuery } from "@tanstack/react-query";

/**
 * [Component] Slider : 공연 포스터 auto play 캐러셀
 */
function Slider() {
  const [concerts, setConcerts] = useState([]);
  const navigate = useNavigate(); // Initialize navigate

  const authQuery = useQuery({
    queryKey: ["auth"],
    queryFn: async () => {
      const response = await axios.get("http://localhost:3001/auth/checkAuth", {
        withCredentials: true,
      });
      return response.data;
    },
  });

  const userType = authQuery.data?.userType;

  useEffect(() => {
    async function fetchConcerts() {
      try {
        const response = await axios.get(
          "http://localhost:3001/concerts/range?endDays=60"
        );
        setConcerts(response.data || []); // Adjust based on actual response structure
      } catch (error) {
        console.error("Error fetching the JSON data:", error);
      }
    }

    fetchConcerts();
  }, []);

  // Handle slide click
  const handleSlideClick = (concertId) => {
    navigate(`/details/${concertId}`);
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
    >
      {concerts.length > 0 ? (
        concerts.map((item) => (
          <SwiperSlide
            key={item.concert_id}
            className={styles.swiperSlide}
            onClick={() => handleSlideClick(item.concert_id)} // Add click handler
          >
            <Slide item={item} />
          </SwiperSlide>
        ))
      ) : (
        <div>No concerts available</div>
      )}
    </Swiper>
  );
}

export default Slider;
