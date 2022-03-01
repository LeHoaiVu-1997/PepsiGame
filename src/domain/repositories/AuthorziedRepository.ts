import {
  ExchangeComboResult,
  GetGiftStoreResult,
  GetRewardResult,
  UpdateUserResult,
} from './../entities/authorized';
import {Observable} from 'rxjs';

export interface AuthorizedRepository {
  getReward(): Observable<GetRewardResult>;
  updateUser(user: any): Observable<UpdateUserResult>;
  exchangeCombo(combo_amount: number): Observable<ExchangeComboResult>;
  getGiftStore(): Observable<GetGiftStoreResult>;
}
