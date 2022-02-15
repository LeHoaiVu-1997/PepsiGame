import {SignUpUseCase} from './../domain/usecases/authentication/SignUp.use-case';
import {container} from 'tsyringe';
import {SignInUseCase} from '../domain/usecases/authentication/SignIn.use-case';
import {RequestOtpUseCase} from '../domain/usecases/authentication/RequestOtp.use-case';
import {VerifyOtpUseCase} from '../domain/usecases/authentication/VerifyOtp.use-case';

export function registerDataDependencies() {
  container.register('SignInUseCase', {
    useClass: SignInUseCase,
  });
  container.register('SignUpUseCase', {
    useClass: SignUpUseCase,
  });
  container.register('RequestOtpUseCase', {
    useClass: RequestOtpUseCase,
  });
  container.register('VerifyOtpUseCase', {
    useClass: VerifyOtpUseCase,
  });
}
