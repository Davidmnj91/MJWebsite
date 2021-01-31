import { Epic, ofType } from 'redux-observable';
import { from, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { CategoryApi } from './Api';
import { CategoryActions } from './Slice';

const fetchCategoryEpic: Epic = (action$) => {
  return action$.pipe(
    ofType(`${CategoryActions.request}`),
    switchMap((_) =>
      from(CategoryApi.getAll()).pipe(
        map((response) => CategoryActions.requestSuccess(response)),
        catchError((error) => of(CategoryActions.requestError(error)))
      )
    )
  );
};

const createCategoryEpic: Epic = (action$) => {
  return action$.pipe(
    ofType(`${CategoryActions.create}`),
    switchMap(({ payload }) =>
      from(CategoryApi.post(payload)).pipe(
        map((response) => CategoryActions.createSuccess(response)),
        catchError((error) => of(CategoryActions.createError(error)))
      )
    )
  );
};

const updateCategoryEpic: Epic = (action$) => {
  return action$.pipe(
    ofType(`${CategoryActions.update}`),
    switchMap(({ payload }) =>
      from(CategoryApi.put(payload.id, payload)).pipe(
        map((response) => CategoryActions.updateSuccess({ id: response.id, changes: response })),
        catchError((error) => of(CategoryActions.updateError(error)))
      )
    )
  );
};

const deleteCategoryEpic: Epic = (action$) => {
  return action$.pipe(
    ofType(`${CategoryActions.delete}`),
    switchMap(({ payload }) =>
      from(CategoryApi.delete(payload)).pipe(
        map((_) => CategoryActions.deleteSuccess(payload)),
        catchError((error) => of(CategoryActions.deleteError(error)))
      )
    )
  );
};

const CategoryEpics = [fetchCategoryEpic, createCategoryEpic, updateCategoryEpic, deleteCategoryEpic];

export default CategoryEpics;
