/* eslint-disable import/prefer-default-export */
import { verify } from 'jsonwebtoken';
import config from '../config';

const { jwtSecreteKey } = config;

export const getUserFromToken = token => verify(token, jwtSecreteKey);
