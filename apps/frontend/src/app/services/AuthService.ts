import jwt_decode from 'jwt-decode';

type JwtDecoded = {
  iat: Date;
  state: string;
  sub: string;
};

const TOKEN_KEY = 'TOKEN_KEY';

export class AuthService {
  public get token(): string | null {
    return sessionStorage.getItem(TOKEN_KEY);
  }

  public set token(token: string | null) {
    if (!token) {
      sessionStorage.removeItem(TOKEN_KEY);
    } else {
      sessionStorage.setItem(TOKEN_KEY, token);
    }
  }

  public isAuthenticated(): boolean {
    return !!this.token;
  }

  public decode(): JwtDecoded | null {
    const token = this.token;
    if (token) {
      return jwt_decode(token);
    }
    return null;
  }
}

const authService = new AuthService();

export default authService;
