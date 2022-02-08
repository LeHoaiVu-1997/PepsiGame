import {createAction} from '@reduxjs/toolkit';
import {Credential} from '../../../domain/entities/authentication';

export const signIn = createAction<Credential>('authentication/signIn');
