import {
  RequestOtpResult,
  SignUpResult,
  SignInResult,
  VerifyOtpResult,
} from './../entities/authentication';
import {Observable} from 'rxjs';

export interface AuthenticationRepository {
  signIn(credential: any): Observable<SignInResult>;
  signUp(credential: any): Observable<SignUpResult>;
  requestOtp(phoneNumber: string): Observable<RequestOtpResult>;
  verifyOtp(otp: string, confirm: any): Observable<VerifyOtpResult>;
}
