import {SignInResponseData} from './../models/AuthenticationModel';
import {ApiResult} from './../models/ApiResult';
import {Observable} from 'rxjs';

export interface RemoteAuthenticationDataSource {
  signIn(body: any): Observable<ApiResult<SignInResponseData>>;
}

export class RemoteAuthenticationDataSourceImpl
  implements RemoteAuthenticationDataSource
{
  signIn(body: any): Observable<ApiResult<SignInResponseData>> {
    throw new Error('Method not implemented.');
  }
}
