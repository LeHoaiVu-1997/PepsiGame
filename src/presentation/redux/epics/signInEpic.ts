import {signIn} from '../actions/authentication.actions';
import {
  signInBegin,
  signInSuccess,
  signInFailed,
} from '../slices/authentication';
import {of, concat} from 'rxjs';
import {filter, switchMap} from 'rxjs/operators';
import {Epic} from 'redux-observable';
import {saveUser} from '../slices/authorized';
import {SignInUseCase} from '../../../domain/usecases/authentication/SignIn.use-case';
import {container} from 'tsyringe';

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

export {getUserEpic};
