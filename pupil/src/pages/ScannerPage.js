import Scanner from "../components/Scanner/Scanner";
import { useParams } from "react-router";

function ScannerPage({}) {
  const { concertId } = useParams();
  return (
    <>
      <Scanner concertId={concertId}></Scanner>
    </>
  );
}

export default ScannerPage;
