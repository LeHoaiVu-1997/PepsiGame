import {Observable} from 'rxjs';
import {
  ExchangeComboResult,
  GetRewardResult,
  UpdateUserResult,
} from '../../domain/entities/authorized';
import {AuthorizedRepository} from './../../domain/repositories/AuthorziedRepository';
import {from} from 'rxjs';
import {getReward, updateUser, exchangeCombo} from '../provider/FirebaseAPI';

export class AuthorizedRepositoryImpl implements AuthorizedRepository {
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
