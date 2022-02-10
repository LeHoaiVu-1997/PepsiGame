import {SignUpResult} from './../entities/authentication';
import {Observable} from 'rxjs';
import {SignInResult} from '../entities/authentication';

export interface AuthenticationRepository {
  signIn(credential: any): Observable<SignInResult>;
  signUp(credential: any): Observable<SignUpResult>;
}
