import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private _http:HttpClient) { }

  login(email: any,password:any) {
    return this._http.post<any>(
      "http://127.0.0.1:5010" + "/auth_event/singin",
      { email: email,
        password:password
      }
    );
  }

  logout() {

  }

  SendEmailForgetPassword(email: any) {
    return this._http.post<any>(
      "http://127.0.0.1:5010" + "/forgetpassword/sendEmailForgetPassword",
      {
        email: email
      }
    );
  }

  restartPassword(password:any) {
    return this._http.post<any>(
      "http://127.0.0.1:5010" + "/forgetpassword/restartPassword",
      {
        password:password
      }
    );
  }

}
