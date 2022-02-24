import {UpdateUserPayload} from './../../../domain/entities/authorized';
import {createAction} from '@reduxjs/toolkit';

export const getReward = createAction('authorized/getReward');
export const updateUser = createAction<UpdateUserPayload>(
  'authorized/updateUser',
);