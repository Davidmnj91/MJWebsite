import { applyMiddleware, combineReducers, createStore } from '@reduxjs/toolkit';
import { composeWithDevTools } from 'redux-devtools-extension';
import logger from 'redux-logger';
import { combineEpics, createEpicMiddleware } from 'redux-observable';
import AuthEpics from './Auth/Epics';
import { AuthReducer } from './Auth/Slice';
import CategoryEpics from './Category/Epics';
import { CategoryReducer } from './Category/Slice';
import ClientEpics from './Client/Epics';
import { ClientReducer } from './Client/Slice';
import ProjectEpics from './Project/Epics';
import { ProjectReducer } from './Project/Slice';

const rootReducer = combineReducers({
  auth: AuthReducer,
  clients: ClientReducer,
  categories: CategoryReducer,
  projects: ProjectReducer,
});
export type RootState = ReturnType<typeof rootReducer>;
const epicMiddleware = createEpicMiddleware();
const rootEpic = combineEpics(...AuthEpics, ...ClientEpics, ...CategoryEpics, ...ProjectEpics);

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(epicMiddleware, logger)));

epicMiddleware.run(rootEpic);

export default store;
