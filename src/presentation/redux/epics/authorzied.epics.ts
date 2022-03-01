import {GetGiftStoreUseCase} from './../../../domain/usecases/authorized/GetGiftStore.use-case';
import {UpdateUserUseCase} from './../../../domain/usecases/authorized/UpdateUser.use-case';
import {GetRewardUseCase} from './../../../domain/usecases/authorized/GetReward.use-case';
import {ExchangeComboUseCase} from '../../../domain/usecases/authorized/ExchangeCombo';
import {of, concat} from 'rxjs';
import {filter, switchMap, map, catchError} from 'rxjs/operators';
import {Epic, combineEpics} from 'redux-observable';
import {container} from 'tsyringe';
import {
  exchangeCombo,
  getReward,
  updateUser,
  getGiftStore,
} from '../actions/authorized.actions';
import {
  getRewardBegin,
  getRewardSuccess,
  getRewardFailed,
  updateUserBegin,
  updateUserSuccess,
  updateUserFailed,
  exchangeComboBegin,
  exchangeComboFailed,
  exchangeComboSuccess,
  getGiftStoreBegin,
  getGiftStoreSuccess,
  getGiftStoreFailed,
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

const ExchangeComboEpic: Epic = action$ => {
  return action$.pipe(
    filter(exchangeCombo.match),
    switchMap(action => {
      let usecase = container.resolve<ExchangeComboUseCase>(
        'ExchangeComboUseCase',
      );
      return concat(
        of(exchangeComboBegin()),
        usecase.call(action.payload).pipe(
          map(res => {
            if (res.success === true)
              return exchangeComboSuccess(res.combo_rewards);
            else return exchangeComboFailed();
          }),
          catchError(() => of(exchangeComboFailed())),
        ),
      );
    }),
  );
};

const GetGiftStoreEpic: Epic = action$ => {
  return action$.pipe(
    filter(getGiftStore.match),
    switchMap(action => {
      let usecase = container.resolve<GetGiftStoreUseCase>(
        'GetGiftStoreUseCase',
      );
      return concat(
        of(getGiftStoreBegin()),
        usecase.call().pipe(
          map(res => {
            if (res.success === true) {
              return getGiftStoreSuccess(res.gifts);
            } else {
              return getGiftStoreFailed();
            }
          }),
          catchError(() => of(getGiftStoreFailed())),
        ),
      );
    }),
  );
};

export const AuthorizedEpics = combineEpics(
  GetRewardEpic,
  UpdateUserEpic,
  ExchangeComboEpic,
  GetGiftStoreEpic,
);
