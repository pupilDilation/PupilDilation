export default function useConvertDateFormat(stringDateTime) {
  return stringDateTime.replace("T", " ") + ":00";
}
