import {Observable, from} from 'rxjs';
import {SignInResult} from '../../domain/entities/authentication';
import {AuthenticationRepository} from './../../domain/repositories/AuthenticationRepository';
import {getUser} from '../provider/FirebaseAPI';

export class AuthenticationRepositoryImpl implements AuthenticationRepository {
  signIn(credential: any): Observable<SignInResult> {
    return from(getUser(credential.phone_number));
  }
}
