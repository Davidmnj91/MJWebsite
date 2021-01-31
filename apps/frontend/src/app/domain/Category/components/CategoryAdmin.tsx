import { Category, CreateCategoryDto } from '@mj-website/api-interfaces';
import { Spinner } from '@mj-website/ui-components';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../..';
import { CategoryActions, CategorySelectors } from '../Slice';
import CategoryFormComponent from './CategoryForm';
import CategoryList from './CategoryTree';

const CategoryAdmin = () => {
  const { entities, loading, selected, editing } = useSelector((state: RootState) => ({
    entities: CategorySelectors.selectAll(state.categories),
    loading: state.categories.loading,
    selected: state.categories.selected,
    editing: state.categories.editing,
  }));

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(CategoryActions.request());
  }, [dispatch]);

  const selectedCategory = selected ? entities.find((c) => c.id === selected) : undefined;

  const doSubmit = (category: CreateCategoryDto) => {
    //dispatch(selected ? CategoryActions.update(category) : CategoryActions.create(category));
  };

  const adaptCategory = (category: Category): CreateCategoryDto => {
    return {
      children_ids: category.children.map((c) => c.id),
      name: category.name,
      parent_id: category.parent_id.id,
      cover: category.cover,
    };
  };

  if (loading) {
    return <Spinner />;
  }

  if (editing) {
    return (
      <CategoryFormComponent
        initialCategory={adaptCategory(selectedCategory)}
        handleSubmit={doSubmit}
        handleCancel={() => dispatch(CategoryActions.cancelEdit())}
      />
    );
  }

  return (
    <CategoryList
      collection={entities}
      onRefresh={() => dispatch(CategoryActions.request())}
      selected={selectedCategory}
      onSelect={(c) => dispatch(CategoryActions.select({ id: c?.id }))}
      onEdit={() => dispatch(CategoryActions.edit())}
      onDelete={() => dispatch(CategoryActions.delete(selected))}
    />
  );
};

export default CategoryAdmin;
