import { OAuth2Client } from 'google-auth-library';
import path from 'node:path';
import fs from 'node:fs/promises';
import createHttpError from 'http-errors';
import { env } from './env.js';

const PATH_JSON = path.join(process.cwd(), 'src', 'google-oauth.json');
const oauthConfig = JSON.parse(await fs.readFile(PATH_JSON));

const googleOauthClient = new OAuth2Client({
  clientId: env('GOOGLE_AUTH_CLIENT_ID'),
  clientSecret: env('GOOGLE_AUTH_CLIENT_SECRET'),
  redirectUri: oauthConfig.web.redirect_uris[0],
});

export const generateAuthUrl = () =>
  googleOauthClient.generateAuthUrl({
    scope: [
      'https://www.googleapis.com/auth/userinfo.email',
      'https://www.googleapis.com/auth/userinfo.profile',
    ],
  });

export const validateCode = async (code) => {
  const response = await googleOauthClient.getToken(code);

  if (!response.tokens.id_token) throw createHttpError(401, 'Unauthorized');

  const ticket = await googleOauthClient.verifyIdToken({
    idToken: response.tokens.id_token,
  });
  return ticket;
};

export const getFullNameFromGoogle = (payload) => {
  let fullName = 'Guest';
  const name = payload.given_name;
  const surname = payload.family_name;

  if (name && surname) {
    fullName = `${name} ${surname}`;
  } else if (name) {
    fullName = name;
  }

  return fullName;
};