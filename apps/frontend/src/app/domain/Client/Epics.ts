import { Epic, ofType } from 'redux-observable';
import { from, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { ClientApi } from './Api';
import { ClientActions } from './Slice';

const fetchClientEpic: Epic = (action$) => {
  return action$.pipe(
    ofType(`${ClientActions.request}`),
    switchMap((_) =>
      from(ClientApi.getAll()).pipe(
        map((response) => ClientActions.requestSuccess(response)),
        catchError((error) => of(ClientActions.requestError(error)))
      )
    )
  );
};

const createClientEpic: Epic = (action$) => {
  return action$.pipe(
    ofType(`${ClientActions.create}`),
    switchMap(({ payload }) =>
      from(ClientApi.post(payload)).pipe(
        map((response) => ClientActions.createSuccess(response)),
        catchError((error) => of(ClientActions.createError(error)))
      )
    )
  );
};

const updateClientEpic: Epic = (action$) => {
  return action$.pipe(
    ofType(`${ClientActions.update}`),
    switchMap(({ payload }) =>
      from(ClientApi.put(payload.id, payload)).pipe(
        map((response) => ClientActions.updateSuccess({ id: response.id, changes: response })),
        catchError((error) => of(ClientActions.updateError(error)))
      )
    )
  );
};

const deleteClientEpic: Epic = (action$) => {
  return action$.pipe(
    ofType(`${ClientActions.delete}`),
    switchMap(({ payload }) =>
      from(ClientApi.delete(payload)).pipe(
        map((_) => ClientActions.deleteSuccess(payload)),
        catchError((error) => of(ClientActions.deleteError(error)))
      )
    )
  );
};

const ClientEpics = [fetchClientEpic, createClientEpic, updateClientEpic, deleteClientEpic];

export default ClientEpics;
