import HTTPService from "../HTTP";
import JWTService from "../JWT";

export default class AuthService {
  static TOKEN_KEY = "authToken";
  static TYPE_KEY = "userType";

  static isAuthenticated = () => localStorage.getItem(AuthService.TOKEN_KEY) !== null;

  static getUser = () =>
    AuthService.isAuthenticated() ? JWTService.decode(AuthService.getUserToken() as string) : null;

  static getUserToken = () => localStorage.getItem(AuthService.TOKEN_KEY);
  static getUserType = () => localStorage.getItem(AuthService.TYPE_KEY);

  static _setToken = (token: string) => {
    localStorage.setItem(AuthService.TOKEN_KEY, token);
  };
  static _setType = (type: string) => {
    localStorage.setItem(AuthService.TYPE_KEY, type);
  };

  static signIn = (email: string, password: string) => {
    return HTTPService.post("/login", {
      email: email,
      password: password,
      remember_login: true,
    }).then((result) => {
      AuthService._setToken(result.data.token);
      AuthService._setType(result.data.type);
    });
  };

  static signUpPatient = (email: string, password: string, fullName: string, cpf: string) => {
    return HTTPService.post("/patient/signup", {
      email: email,
      password: password,
      name: fullName,
      cpf: cpf,
      remember_login: true,
    }).then((result) => {
      AuthService._setToken(result.data.token);
    });
  };

  static signUpProfessional = (
    email: string,
    password: string,
    fullName: string,
    cpf: string,
    registrationID: string,
    institution: string
  ) => {
    return HTTPService.post("/professional/signup", {
      email: email,
      password: password,
      name: fullName,
      cpf: cpf,
      registration_id: registrationID,
      institution: institution,
      remember_login: true,
    }).then((result) => {
      AuthService._setToken(result.data.token);
    });
  };

  static signOut = () => {
    localStorage.removeItem(AuthService.TOKEN_KEY);
    localStorage.removeItem(AuthService.TYPE_KEY);
    return HTTPService.post("/logout");
  };
}
