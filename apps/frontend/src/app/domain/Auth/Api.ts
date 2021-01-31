import http from '../../services/http';

const AuthApi = {
  doLogin: (code: number, state: string) => {
    return http.get<{ access_token: string }>(`${process.env.NX_API_URL}auth?auth_code=${code}&state=${state}`);
  },
};

export default AuthApi;
