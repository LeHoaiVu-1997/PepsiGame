import {Observable} from 'rxjs';
import {SignInResult} from '../entities/authentication';
import { Error } from '../../core/Errors/types';

export interface AuthenticationRepository {
  signIn(credential: any): Observable<SignInResult>;
}
