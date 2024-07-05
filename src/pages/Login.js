import Header from "../components/Header/Header";
import Slider from "../components/Swiper/Slider";
import useClassNameJoin from "../hooks/useClassNameJoin";
import LoginForm from "../components/Login/LoginForm";
import Wrapper from "../components/Wrapper/Wrapper";
import WrapperStyles from "../components/Wrapper/Wrapper.module.css";

function Login() {
  return (
    <Wrapper>
      <LoginForm />
    </Wrapper>
  );
}

export default Login;
