import {signIn, signUp} from '../actions/authentication.actions';
import {
  signInBegin,
  signInSuccess,
  signInFailed,
  signUpBegin,
  signUpSuccess,
  signUpFailed,
} from '../slices/authentication';
import {of, concat} from 'rxjs';
import {filter, switchMap} from 'rxjs/operators';
import {Epic, combineEpics} from 'redux-observable';
import {saveUser} from '../slices/authorized';
import {SignInUseCase} from '../../../domain/usecases/authentication/SignIn.use-case';
import {container} from 'tsyringe';
import {SignUpUseCase} from '../../../domain/usecases/authentication/SignUp.use-case';

const getUserEpic: Epic = action$ => {
  return action$.pipe(
    filter(signIn.match),
    switchMap(action => {
      let usecase = container.resolve<SignInUseCase>('SignInUseCase');
      return concat(
        of(signInBegin()),
        usecase.call(action.payload).pipe(
          switchMap(res => {
            if (res !== undefined) return [saveUser(res), signInSuccess()];
            return [signInFailed()];
          }),
        ),
      );
    }),
  );
};

const signUpEpic: Epic = action$ => {
  return action$.pipe(
    filter(signUp.match),
    switchMap(action => {
      let usecase = container.resolve<SignUpUseCase>('SignUpUseCase');
      return concat(
        of(signUpBegin()),
        usecase.call(action.payload).pipe(
          switchMap(res => {
            if (res.success === true)
              return [signUpSuccess(), signIn(res.data.phone_number)];
            return [signUpFailed()];
          }),
        ),
      );
    }),
  );
};

export {getUserEpic, signUpEpic};
export const rootEpic = combineEpics(getUserEpic, signUpEpic);
