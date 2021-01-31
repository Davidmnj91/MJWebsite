import { CreateProjectDto, Project } from '@mj-website/api-interfaces';
import { HttpError } from '@mj-website/http';
import { createEntityAdapter, createSlice, EntityState, PayloadAction, Update } from '@reduxjs/toolkit';
import { ApiState } from '../utils/ApiState';
import { EditorState } from '../utils/MutableState';

const projectAdapter = createEntityAdapter<Project>({
  selectId: (project: Project) => project.id,
  sortComparer: (a: Project, b: Project) => a.name.localeCompare(b.name),
});

type ProjectState = EntityState<Project> & ApiState & EditorState;

const initialState: ProjectState = {
  ...projectAdapter.getInitialState(),
  editing: false,
  loading: false,
};

export const ProjectSliceName = 'PROJECT_SLICE';

const projectSlice = createSlice({
  name: ProjectSliceName,
  initialState,
  reducers: {
    request: (state) => {
      state.loading = true;
    },
    requestSuccess: (state, action: PayloadAction<Project[]>) => {
      projectAdapter.setAll(state as EntityState<Project>, action.payload);
      state.loading = false;
    },
    requestError: (state, action: PayloadAction<HttpError>) => {
      state.error = action.payload;
      state.loading = false;
    },
    create: (state, _: PayloadAction<Partial<CreateProjectDto>>) => {
      state.loading = true;
    },
    createSuccess: (state, action: PayloadAction<Project>) => {
      projectAdapter.addOne(state as EntityState<Project>, action.payload);
      state.loading = false;
    },
    createError: (state, action: PayloadAction<HttpError>) => {
      state.error = action.payload;
      state.loading = false;
    },
    update: (state, _: PayloadAction<CreateProjectDto>) => {
      state.loading = true;
    },
    updateSuccess: (state, action: PayloadAction<Update<Project>>) => {
      projectAdapter.updateOne(state as EntityState<Project>, action.payload);
      state.loading = false;
    },
    updateError: (state, action: PayloadAction<HttpError>) => {
      state.error = action.payload;
      state.loading = false;
    },
    delete: (state, _: PayloadAction<string>) => {
      state.loading = true;
    },
    deleteSuccess: (state, action: PayloadAction<string>) => {
      projectAdapter.removeOne(state as EntityState<Project>, action.payload);
      state.loading = false;
    },
    deleteError: (state, action: PayloadAction<HttpError>) => {
      state.error = action.payload;
      state.loading = false;
    },
    select: (state, action: PayloadAction<{ id?: string }>) => {
      if (action.payload.id) {
        state.selected = state.selected === action.payload.id ? undefined : action.payload.id;
      } else {
        state.selected = undefined;
      }
    },
    edit: (state) => {
      state.editing = true;
    },
    cancelEdit: (state) => {
      state.editing = false;
    },
  },
});

export const ProjectActions = projectSlice.actions;
export const ProjectSelectors = projectAdapter.getSelectors();

export const ProjectReducer = projectSlice.reducer;
