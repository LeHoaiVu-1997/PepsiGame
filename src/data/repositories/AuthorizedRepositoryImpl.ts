import {Observable} from 'rxjs';
import {
  ExchangeComboResult,
  GetGiftStoreResult,
  GetRewardResult,
  UpdateUserResult,
} from '../../domain/entities/authorized';
import {AuthorizedRepository} from './../../domain/repositories/AuthorziedRepository';
import {from} from 'rxjs';
import {
  getReward,
  updateUser,
  exchangeCombo,
  getGiftStore,
} from '../provider/FirebaseAPI';

export class AuthorizedRepositoryImpl implements AuthorizedRepository {
  getGiftStore(): Observable<GetGiftStoreResult> {
    return from(getGiftStore());
  }
  exchangeCombo(combo_amount: number): Observable<ExchangeComboResult> {
    return from(exchangeCombo(combo_amount));
  }
  updateUser(user: any): Observable<UpdateUserResult> {
    return from(updateUser(user));
  }
  getReward(): Observable<GetRewardResult> {
    return from(getReward());
  }
}
