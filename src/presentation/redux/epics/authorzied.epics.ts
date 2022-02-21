import {UpdateUserUseCase} from './../../../domain/usecases/authorized/UpdateUser.use-case';
import {GetRewardUseCase} from './../../../domain/usecases/authorized/GetReward.use-case';
import {of, concat} from 'rxjs';
import {filter, switchMap, map, catchError} from 'rxjs/operators';
import {Epic, combineEpics} from 'redux-observable';
import {container} from 'tsyringe';
import {getReward, updateUser} from '../actions/authorized.actions';
import {
  getRewardBegin,
  getRewardSuccess,
  getRewardFailed,
  updateUserBegin,
  updateUserSuccess,
  updateUserFailed,
} from '../slices/authorized';

const GetRewardEpic: Epic = action$ => {
  return action$.pipe(
    filter(getReward.match),
    switchMap(action => {
      let usecase = container.resolve<GetRewardUseCase>('GetRewardUseCase');
      return concat(
        of(getRewardBegin()),
        usecase.call().pipe(
          map(res => {
            if (res.success === true) return getRewardSuccess(res.reward);
            return getRewardFailed();
          }),
          catchError(() => of(getRewardFailed())),
        ),
      );
    }),
  );
};

const UpdateUserEpic: Epic = action$ => {
  return action$.pipe(
    filter(updateUser.match),
    switchMap(action => {
      console.log('update user playload: ', action.payload);

      let usecase = container.resolve<UpdateUserUseCase>('UpdateUserUseCase');
      return concat(
        of(updateUserBegin()),
        usecase.call(action.payload.user).pipe(
          map(res => {
            if (res.success === true) return updateUserSuccess(res.user);
            else return updateUserFailed();
          }),
          catchError(() => of(updateUserFailed())),
        ),
      );
    }),
  );
};

export const AuthorizedEpics = combineEpics(GetRewardEpic, UpdateUserEpic);
