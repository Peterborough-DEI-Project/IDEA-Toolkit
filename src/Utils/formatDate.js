import dayjs from "dayjs";
dayjs();

export default function formatDate(dateString) {
  if (dayjs(dateString).isValid()) {
    return dayjs(dateString).format("MMM DD, YYYY");
  }
  return null;
}
