import {Observable, from} from 'rxjs';
import {SignInResult} from '../../domain/entities/authentication';
import {getUser} from '../../presentation/screens/authentication/sign-in/firebaseAPI';
import {AuthenticationRepository} from './../../domain/repositories/AuthenticationRepository';

export class AuthenticationRepositoryImpl implements AuthenticationRepository {
  signIn(credential: any): Observable<any> {
    console.log('AuthenticationRepositoryImpl called');
    return from(getUser(credential.phone_number));
  }
}
