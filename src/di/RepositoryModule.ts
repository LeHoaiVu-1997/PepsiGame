import {AuthorizedRepositoryImpl} from './../data/repositories/AuthorizedRepositoryImpl';
import {AuthenticationRepositoryImpl} from './../data/repositories/AuthenticationRepositoryImpl';
import {container} from 'tsyringe';

export function registerRepositoryDependencies() {
  container.register('AuthenticationRepository', {
    useClass: AuthenticationRepositoryImpl,
  });
  container.register('AuthorizedRepository', {
    useClass: AuthorizedRepositoryImpl,
  });
}
