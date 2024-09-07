import Scanner from "../components/Scanner/Scanner";
import { useParams } from "react-router";

function ScannerPage({}) {
  const { sessionId } = useParams();
  return (
    <>
      <Scanner sessionId={sessionId}></Scanner>
    </>
  );
}

export default ScannerPage;
