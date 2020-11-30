import DateService from "../Date";

export default class VideoService {
  static parseBackendResponse = (videosObject: { [key: number]: [] }) => {
    let dates = Object.keys(videosObject);
    if (dates.length === 0) return [];
    dates.sort((a, b) => parseInt(b) - parseInt(a));
    return dates.map((date: string) => {
      let videosOfDay = { videos: [], date: "" };
      videosOfDay.videos = videosObject[parseInt(date)];
      videosOfDay.date = DateService.toReadableDate(DateService.fromBackendInt(parseInt(date)));
      return videosOfDay;
    });
  };
}
