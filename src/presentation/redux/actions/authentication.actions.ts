import {createAction} from '@reduxjs/toolkit';
import {Credential} from '../../../domain/entities/authentication';

export const signIn = createAction<Credential>('authentication/signIn');
export const signUp = createAction<Credential>('authentocation/signUp');
export const verifyOtp = createAction('authentication/verifyOtp');
