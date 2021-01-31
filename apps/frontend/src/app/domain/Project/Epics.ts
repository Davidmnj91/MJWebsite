import { Epic, ofType } from 'redux-observable';
import { from, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { ProjectApi } from './Api';
import { ProjectActions } from './Slice';

const fetchProjectEpic: Epic = (action$) => {
  return action$.pipe(
    ofType(`${ProjectActions.request}`),
    switchMap((_) =>
      from(ProjectApi.getAll()).pipe(
        map((response) => ProjectActions.requestSuccess(response)),
        catchError((error) => of(ProjectActions.requestError(error)))
      )
    )
  );
};

const createProjectEpic: Epic = (action$) => {
  return action$.pipe(
    ofType(`${ProjectActions.create}`),
    switchMap(({ payload }) =>
      from(ProjectApi.post(payload)).pipe(
        map((response) => ProjectActions.createSuccess(response)),
        catchError((error) => of(ProjectActions.createError(error)))
      )
    )
  );
};

const updateProjectEpic: Epic = (action$) => {
  return action$.pipe(
    ofType(`${ProjectActions.update}`),
    switchMap(({ payload }) =>
      from(ProjectApi.put(payload.id, payload)).pipe(
        map((response) => ProjectActions.updateSuccess({ id: response.id, changes: response })),
        catchError((error) => of(ProjectActions.updateError(error)))
      )
    )
  );
};

const deleteProjectEpic: Epic = (action$) => {
  return action$.pipe(
    ofType(`${ProjectActions.delete}`),
    switchMap(({ payload }) =>
      from(ProjectApi.delete(payload)).pipe(
        map((_) => ProjectActions.deleteSuccess(payload)),
        catchError((error) => of(ProjectActions.deleteError(error)))
      )
    )
  );
};

const ProjectEpics = [fetchProjectEpic, createProjectEpic, updateProjectEpic, deleteProjectEpic];

export default ProjectEpics;
