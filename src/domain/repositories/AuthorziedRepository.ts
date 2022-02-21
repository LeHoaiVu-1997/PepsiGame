import {GetRewardResult, UpdateUserResult} from './../entities/authorized';
import {Observable} from 'rxjs';

export interface AuthorizedRepository {
  getReward(): Observable<GetRewardResult>;
  updateUser(user: any): Observable<UpdateUserResult>;
}
