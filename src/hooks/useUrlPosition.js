import { useSearchParams } from "react-router-dom";

export function useUrlPosition() {
  const [searchParsms] = useSearchParams();
  const lat = searchParsms.get("lat");
  const lng = searchParsms.get("lng");

  return [lat, lng];
}
