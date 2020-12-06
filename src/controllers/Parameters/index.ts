import HttpService from "../../services/HTTP";

export default class ParametersController {
  static getPatientParameters = (patientToken: string) => {
    return HttpService.get("/professional/patient/game-config?patient_token=" + patientToken);
  };

  static setPatientParameters = (patientToken: string, parameters: iParameters) => {
    return HttpService.post("/professional/patient/game-config", {
      patient_token: patientToken,
      parameters: parameters,
    });
  };
}

interface iParameters {
  difficulty: number;
  velocity: number;
}
