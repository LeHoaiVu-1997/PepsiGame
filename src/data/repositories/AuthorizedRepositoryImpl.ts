import {Observable} from 'rxjs';
import {
  GetRewardResult,
  UpdateUserResult,
} from '../../domain/entities/authorized';
import {AuthorizedRepository} from './../../domain/repositories/AuthorziedRepository';
import {from} from 'rxjs';
import {getReward, updateUser} from '../provider/FirebaseAPI';

export class AuthorizedRepositoryImpl implements AuthorizedRepository {
  updateUser(user: any): Observable<UpdateUserResult> {
    return from(updateUser(user));
  }
  getReward(): Observable<GetRewardResult> {
    return from(getReward());
  }
}
