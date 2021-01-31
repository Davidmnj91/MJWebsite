import { Client } from '@mj-website/api-interfaces';
import { HttpError } from '@mj-website/http';
import { createEntityAdapter, createSlice, EntityState, PayloadAction, Update } from '@reduxjs/toolkit';
import { ApiState } from '../utils/ApiState';
import { EditorState } from '../utils/MutableState';

const clientAdapter = createEntityAdapter<Client>({
  selectId: (client: Client) => client.id,
  sortComparer: (a: Client, b: Client) => a.name.localeCompare(b.name),
});

type ClientState = EntityState<Client> & ApiState & EditorState;

const initialState: ClientState = {
  ...clientAdapter.getInitialState(),
  editing: false,
  loading: false,
};

export const ClientSliceName = 'CLIENT_SLICE';

const clientSlice = createSlice({
  name: ClientSliceName,
  initialState,
  reducers: {
    request: (state) => {
      state.loading = true;
    },
    requestSuccess: (state, action: PayloadAction<Client[]>) => {
      clientAdapter.setAll(state as EntityState<Client>, action.payload);
      state.loading = false;
    },
    requestError: (state, action: PayloadAction<HttpError>) => {
      state.error = action.payload;
      state.loading = false;
    },
    create: (state, _: PayloadAction<Partial<Client>>) => {
      state.loading = true;
    },
    createSuccess: (state, action: PayloadAction<Client>) => {
      clientAdapter.addOne(state as EntityState<Client>, action.payload);
      state.loading = false;
    },
    createError: (state, action: PayloadAction<HttpError>) => {
      state.error = action.payload;
      state.loading = false;
    },
    update: (state, _: PayloadAction<Client>) => {
      state.loading = true;
    },
    updateSuccess: (state, action: PayloadAction<Update<Client>>) => {
      clientAdapter.updateOne(state as EntityState<Client>, action.payload);
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
      clientAdapter.removeOne(state as EntityState<Client>, action.payload);
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

export const ClientActions = clientSlice.actions;
export const ClientSelectors = clientAdapter.getSelectors();

export const ClientReducer = clientSlice.reducer;
