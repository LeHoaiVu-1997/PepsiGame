import {AuthenticationRepositoryImpl} from './../../../data/repositories/AuthenticationRepositoryImpl';
import {signIn} from '../actions/authentication.actions';
import {
  signInBegin,
  signInSuccess,
  signInFailed,
} from '../slices/authentication';
import {Observable} from 'rxjs';
import {of, concat, from} from 'rxjs';
import {filter, catchError, switchMap, map} from 'rxjs/operators';
import {Epic} from 'redux-observable';
import {saveUser} from '../slices/authorized';
import {SignInUseCase} from '../../../domain/usecases/authentication/SignIn.use-case';
import {AuthenticationRepository} from '../../../domain/repositories/AuthenticationRepository';
import {container} from 'tsyringe';

const getUserEpic: Epic = action$ => {
  return action$.pipe(
    filter(signIn.match),
    switchMap(action => {
      let usecase = container.resolve<SignInUseCase>('SignInUseCase');
      return concat(
        of(signInBegin()),
        // from(getUser(action.payload.phone_number)).pipe(
        //   map(response => saveUser(response)),
        // ),
        usecase.call(action.payload).pipe(map(res => saveUser(res))),
        of(signInSuccess()),
      );
    }),
  );
};

export {getUserEpic};
