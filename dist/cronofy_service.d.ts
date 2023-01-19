import { CreateAcessTokenRes } from './models/create_access_token_res';
export declare class NylasService {
    static basicHeaders: {
        'Content-Type': string;
    };
    static createAccessToken(authCode: string): Promise<import("axios").AxiosResponse<CreateAcessTokenRes, any>>;
}
