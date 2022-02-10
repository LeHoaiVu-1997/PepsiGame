import {Observable, from} from 'rxjs';
import {SignInResult, SignUpResult} from '../../domain/entities/authentication';
import {AuthenticationRepository} from './../../domain/repositories/AuthenticationRepository';
import {getUser, signUp} from '../provider/FirebaseAPI';

export class AuthenticationRepositoryImpl implements AuthenticationRepository {
  signUp(credential: any): Observable<SignUpResult> {
    return from(signUp(credential));
  }
  signIn(credential: any): Observable<SignInResult> {
    return from(getUser(credential.phone_number));
  }
}
