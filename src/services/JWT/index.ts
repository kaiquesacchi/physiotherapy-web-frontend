import jwtDecode from "jwt-decode";

interface iKeyable {
  [key: string]: any;
}

export default class JWTService {
  static decode = (token: string) => {
    return jwtDecode(token);
  };

  static decodeList = (list: object[]) => {
    return list.map((element: any) => {
      let elementObj = jwtDecode(element.token) as iKeyable;
      elementObj.token = element.token;
      return elementObj;
    });
  };
}
