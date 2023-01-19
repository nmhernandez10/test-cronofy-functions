import axios from 'axios';
import { firestore } from 'firebase-admin';
import { Config } from './config';
import { CreateAcessTokenRes } from './models/create_access_token_res';
import { DeltaObjectData } from './models/delta_object_data';

export class NylasService {
  static basicHeaders = {
    'Content-Type': 'application/json; charset=utf-8',
  };

  static createAccessToken(authCode: string) {
    return axios.post<CreateAcessTokenRes>(
      `${Config.cronofyApiUrl}/oauth/token`,
      {
        client_id: Config.clientId,
        client_secret: Config.clientSecret,
        grant_type: 'authorization_code',
        code: authCode,
      },
      {
        headers: NylasService.basicHeaders,
      },
    );
  }
}
