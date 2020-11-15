import HttpService from "../../services/HTTP";

export default class LinkController {
  static getLinkRequests = () => {
    return HttpService.get("/patient/link");
  };
  static getLinksAsProfessional = () => {
    return HttpService.get("/professional/link");
  };
  static createLinkRequest = (patientCpf: string) => {
    return HttpService.post("/professional/link", { cpf: patientCpf });
  };
  static answerLinkRequest = (accept: boolean, professionalToken: string) => {
    return HttpService.post("/patient/link", { accept: accept, professional_token: professionalToken });
  };
}
