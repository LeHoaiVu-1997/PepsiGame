import {AuthenticationRepositoryImpl} from './../data/repositories/AuthenticationRepositoryImpl';
import {container} from 'tsyringe';

export function registerRepositoryDependencies() {
  container.register('AuthenticationRepository', {
    useClass: AuthenticationRepositoryImpl,
  });
}
