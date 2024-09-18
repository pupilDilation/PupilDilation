import Slider from "../components/Swiper/Slider";
import Wrapper from "../components/Wrapper/Wrapper";
import ClubSlider from "../components/Swiper/ClubSlider";
import WrapperStyles from "../components/Wrapper/Wrapper.module.css";

function Main() {
  return (
    <Wrapper>
      <Slider></Slider>
      <ClubSlider />
    </Wrapper>
  );
}

export default Main;
