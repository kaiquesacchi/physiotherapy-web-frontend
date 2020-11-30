import { format } from "date-fns";

export default class DateService {
  static toBackendInt(date: Date) {
    return Math.floor(date.getTime() / 1000);
  }
  static fromBackendInt(date: number) {
    return new Date(date * 1000);
  }
  static toReadableTime(date: Date) {
    return format(date, "HH:mm");
  }
  static toReadableDate(date: Date, year: boolean = true) {
    return year ? format(date, "dd/MM/yyyy") : format(date, "dd/MM");
  }
  static toReadableDateTime(date: Date) {
    return `${DateService.toReadableDate(date)} ${DateService.toReadableTime(date)}`;
  }
}
