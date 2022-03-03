import {
  requestOtp,
  signIn,
  signOut,
  signUp,
  verifyOtp,
} from '../actions/authentication.actions';
import {
  signInBegin,
  signInSuccess,
  signInFailed,
  signUpBegin,
  signUpSuccess,
  signUpFailed,
  requestOtpBegin,
  requestOtpFailed,
  requestOtpSuccess,
  verifyOtpBegin,
  verifyOtpFailed,
  verifyOtpSuccess,
  resetAllStateAuthentication,
} from '../slices/authentication';
import {of, concat} from 'rxjs';
import {filter, switchMap, map, catchError} from 'rxjs/operators';
import {Epic, combineEpics} from 'redux-observable';
import {resetAllStateAuthorized, saveUser} from '../slices/authorized';
import {SignInUseCase} from '../../../domain/usecases/authentication/SignIn.use-case';
import {container} from 'tsyringe';
import {SignUpUseCase} from '../../../domain/usecases/authentication/SignUp.use-case';
import {RequestOtpUseCase} from '../../../domain/usecases/authentication/RequestOtp.use-case';
import {VerifyOtpUseCase} from './../../../domain/usecases/authentication/VerifyOtp.use-case';

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
              return [saveUser(res.data), signUpSuccess()];
            return [signUpFailed()];
          }),
          catchError(() => of(signUpFailed())),
        ),
      );
    }),
  );
};

const requestOtpEpic: Epic = action$ => {
  return action$.pipe(
    filter(requestOtp.match),
    switchMap(action => {
      let usecase = container.resolve<RequestOtpUseCase>('RequestOtpUseCase');
      return concat(
        of(requestOtpBegin()),
        usecase.call(action.payload).pipe(
          map(res => requestOtpSuccess(res)),
          catchError(() => of(requestOtpFailed())),
        ),
      );
    }),
  );
};

const verifyOtpEpic: Epic = action$ => {
  return action$.pipe(
    filter(verifyOtp.match),
    switchMap(action => {
      let usecase = container.resolve<VerifyOtpUseCase>('VerifyOtpUseCase');
      return concat(
        of(verifyOtpBegin()),
        usecase.call(action.payload).pipe(
          map(res => {
            if (res.success === true) return verifyOtpSuccess();
            return verifyOtpFailed(res);
          }),
          catchError(res => of(verifyOtpFailed(res))),
        ),
      );
    }),
  );
};

const signOutEpic: Epic = action$ => {
  return action$.pipe(
    filter(signOut.match),
    switchMap(() => {
      return concat(
        of(resetAllStateAuthentication()),
        of(resetAllStateAuthorized()),
      );
    }),
  );
};

export {getUserEpic, signUpEpic, requestOtpEpic, verifyOtpEpic};
export const AuthenticationEpics = combineEpics(
  getUserEpic,
  signUpEpic,
  requestOtpEpic,
  verifyOtpEpic,
  signOutEpic,
);
