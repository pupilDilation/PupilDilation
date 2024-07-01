// export default function Button(props) {
//   return <button>hihi</button>;
// }
import { styled } from "styled-components";
import { Link } from "react-router-dom";

const Button = styled.button`
  background-color: white;
  color: red;
`;

function LinkButton() {
  return <Link></Link>;
}

export default Button;
