import { Either } from '@mj-website/monads';

export type TypeOrId<T> = Either<T, string>;
