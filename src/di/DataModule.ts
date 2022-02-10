import {SignUpUseCase} from './../domain/usecases/authentication/SignUp.use-case';
import {container} from 'tsyringe';
import {SignInUseCase} from '../domain/usecases/authentication/SignIn.use-case';

export function registerDataDependencies() {
  container.register('SignInUseCase', {
    useClass: SignInUseCase,
  });
  container.register('SignUpUseCase', {
    useClass: SignUpUseCase,
  });
}
