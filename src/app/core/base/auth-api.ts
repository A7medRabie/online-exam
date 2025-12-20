import { Observable } from 'rxjs';
import { LoginRequest, LoginResponse } from '../interfaces/login.interface';
import { SignupRequest, SignupResponse } from '../interfaces/signup.interface';
import { forgotPassword, forgotPasswordResponse, reset, resetResponse, verifyOtp, verifyOtpResponse } from '../interfaces/password.interface';
  
export abstract class AuthAPI {
  /**
   * @summary This method is used to submit the login details of the user and return the result from backend
   * @param data the data submitted in [ Login ] Form
   * @returns Observable
   */
  abstract login(data: LoginRequest): Observable<LoginResponse>
  abstract register(data: SignupRequest): Observable<SignupResponse>;
  abstract forgotPassword(data: forgotPassword): Observable<forgotPasswordResponse>;
  abstract verifyOtp(data: verifyOtp): Observable<verifyOtpResponse>;
  abstract resetPassword(data:reset): Observable<resetResponse>;
 }

 
