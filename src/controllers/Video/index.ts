import HttpService from "../../services/HTTP";

export default class VideoController {
  static getVideoIDsAsPatient = () => {
    return HttpService.get("/patient/sessions");
  };
  static getVideoIDsAsProfessional = (patientToken: string) => {
    return HttpService.get("/professional/sessions?patient_token=" + patientToken);
  };
  static getVideoLinkByID = (videoID: number) => {
    return HttpService.url + "/video?video_id=" + videoID;
  };
}
