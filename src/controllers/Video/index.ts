import HttpService from "../../services/HTTP";

export default class VideoController {
  static getVideoIDsAsPatient = () => {
    return HttpService.get(`/patient/sessions?time_delta=${new Date().getTimezoneOffset() / -60}`);
  };
  static getVideoIDsAsProfessional = (patientToken: string) => {
    return HttpService.get(
      `/professional/sessions?patient_token=${patientToken}&time_delta=${new Date().getTimezoneOffset() / -60}`
    );
  };
  static getVideoLinkByID = (videoID: number) => {
    return HttpService.url + "/video?video_id=" + videoID;
  };
  static deleteVideoByID = (videoID: number) => {
    return HttpService.delete("/video?video_id=" + videoID);
  };
  static getThumbnailByID = (videoID: number) => {
    return HttpService.url + "/thumbnail?video_id=" + videoID;
  };
}
