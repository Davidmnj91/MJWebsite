import { CreateProjectDto, Project } from '@mj-website/api-interfaces';
import { Spinner } from '@mj-website/ui-components';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../..';
import { ProjectActions, ProjectSelectors } from '../Slice';
import ProjectFormComponent from './ProjectForm';
import ProjectList from './ProjectTable';

const ProjectAdmin = () => {
  const { entities, loading, selected, editing } = useSelector((state: RootState) => ({
    entities: ProjectSelectors.selectAll(state.projects),
    loading: state.projects.loading,
    selected: state.projects.selected,
    editing: state.projects.editing,
  }));

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(ProjectActions.request());
  }, [dispatch]);

  const selectedProject = selected ? entities.find((c) => c.id === selected) : undefined;

  const doSubmit = (project: CreateProjectDto) => {
    dispatch(selected ? ProjectActions.update(project) : ProjectActions.create(project));
  };

  const adaptProject = (project?: Project): CreateProjectDto => {
    return {
      name: project?.name,
      category_id: project?.category.id,
      client_id: project?.client.id,
      photos: project?.photos.map((p) => ({ order: p.order, image: p.file as any })),
      images: [],
    };
  };

  if (loading) {
    return <Spinner />;
  }

  if (editing) {
    return (
      <ProjectFormComponent
        initialProject={adaptProject(selectedProject)}
        handleSubmit={doSubmit}
        handleCancel={() => dispatch(ProjectActions.cancelEdit())}
      />
    );
  }

  return (
    <ProjectList
      collection={entities}
      onRefresh={() => dispatch(ProjectActions.request())}
      selected={selectedProject}
      onSelect={(c) => dispatch(ProjectActions.select({ id: c?.id }))}
      onEdit={() => dispatch(ProjectActions.edit())}
      onDelete={() => dispatch(ProjectActions.delete(selected))}
    />
  );
};

export default ProjectAdmin;
