import { Category } from '@mj-website/api-interfaces';
import { HttpError } from '@mj-website/http';
import { createEntityAdapter, createSlice, EntityState, PayloadAction, Update } from '@reduxjs/toolkit';
import { ApiState } from '../utils/ApiState';
import { EditorState } from '../utils/MutableState';

const categoryAdapter = createEntityAdapter<Category>({
  selectId: (category: Category) => category.id,
  sortComparer: (a: Category, b: Category) => a.name.localeCompare(b.name),
});

type CategoryState = EntityState<Category> & ApiState & EditorState;

const initialState: CategoryState = {
  ...categoryAdapter.getInitialState(),
  editing: false,
  loading: false,
};

export const CategorySliceName = 'CATEGORY_SLICE';

const categorySlice = createSlice({
  name: CategorySliceName,
  initialState,
  reducers: {
    request: (state) => {
      state.loading = true;
    },
    requestSuccess: (state, action: PayloadAction<Category[]>) => {
      categoryAdapter.setAll(state as EntityState<Category>, action.payload);
      state.loading = false;
    },
    requestError: (state, action: PayloadAction<HttpError>) => {
      state.error = action.payload;
      state.loading = false;
    },
    create: (state, _: PayloadAction<Partial<Category>>) => {
      state.loading = true;
    },
    createSuccess: (state, action: PayloadAction<Category>) => {
      categoryAdapter.addOne(state as EntityState<Category>, action.payload);
      state.loading = false;
    },
    createError: (state, action: PayloadAction<HttpError>) => {
      state.error = action.payload;
      state.loading = false;
    },
    update: (state, _: PayloadAction<Category>) => {
      state.loading = true;
    },
    updateSuccess: (state, action: PayloadAction<Update<Category>>) => {
      categoryAdapter.updateOne(state as EntityState<Category>, action.payload);
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
      categoryAdapter.removeOne(state as EntityState<Category>, action.payload);
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

export const CategoryActions = categorySlice.actions;
export const CategorySelectors = categoryAdapter.getSelectors();

export const CategoryReducer = categorySlice.reducer;
