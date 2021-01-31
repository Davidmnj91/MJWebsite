import { HttpError } from '@mj-website/http';
import { Epic, ofType } from 'redux-observable';
import { from, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import authService from '../../services/AuthService';
import AuthApi from './Api';
import { doLogin, doLoginError, doLoginSuccess } from './Slice';

const doLoginEpic: Epic = (action$) => {
  return action$.pipe(
    ofType(`${doLogin}`),
    switchMap((action) =>
      from(AuthApi.doLogin(action.payload.code, action.payload.state)).pipe(
        map(({ access_token }) => {
          authService.token = access_token;
          return doLoginSuccess(access_token);
        }),
        catchError((error: HttpError) => {
          return of(doLoginError(error.message));
        })
      )
    )
  );
};

const AuthEpics = [doLoginEpic];

export default AuthEpics;
