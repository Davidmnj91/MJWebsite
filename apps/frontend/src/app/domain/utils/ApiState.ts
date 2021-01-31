import { HttpError } from '@mj-website/http';

export type ApiState = {
  loading: boolean;
  error?: HttpError;
};
