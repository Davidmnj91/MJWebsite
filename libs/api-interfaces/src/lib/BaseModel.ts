export type EntityProps = {
  id: string;
  created_at?: Date;
  updated_at?: Date;
};

export type HierarchicalProps<T> = {
  parent_id?: string;
  children: T[];
};

export type NamedProps = {
  name: string;
};
