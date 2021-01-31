import { ProjectProps } from '@mj-website/api-interfaces';
import * as Faker from 'faker';
import { FakeProjectRepository } from '../persistance/FakeProjectRepository';
import { ProjectService } from './ProjectService';

describe('Project Repository Test', () => {
  const projectRepository = new FakeProjectRepository();
  const projectService = new ProjectService(projectRepository);

  beforeEach(() => {
    projectRepository.clear();
  });

  it('should be able to add project', async () => {
    let errorOccurred = false;

    const projectProps: ProjectProps = {
      name: Faker.name.firstName(),
      children: [],
      cover: undefined,
    };

    try {
      const addedProjectResult = await projectService.add(projectProps);
      const addedProject = addedProjectResult.getValue();

      expect(addedProjectResult.isSuccess).toBeTruthy();
      expect(addedProject).toEqual({ ...addedProject, ...projectProps });
    } catch (err) {
      errorOccurred = true;
    }

    expect(errorOccurred).toBeFalsy();
  });

  it('should be able to edit project', async () => {
    let errorOccurred = false;

    const projectProps: ProjectProps = {
      name: Faker.name.firstName(),
      children: [],
      cover: undefined,
    };

    const modifyProject: ProjectProps = {
      name: Faker.name.firstName(),
      children: [],
      cover: undefined,
    };

    try {
      const addedProjectResult = await projectService.add(projectProps);
      const addedProject = addedProjectResult.getValue();

      expect(addedProjectResult.isSuccess).toBeTruthy();
      expect(addedProject).toEqual({ ...addedProject, ...projectProps });

      const editedProjectResult = await projectService.edit(addedProject.id, modifyProject);
      const editedProject = editedProjectResult.getValue();

      expect(editedProjectResult.isSuccess).toBeTruthy();
      expect(editedProject).toEqual({ ...editedProject, ...modifyProject });
    } catch (err) {
      errorOccurred = true;
    }

    expect(errorOccurred).toBeFalsy();
  });

  it('should be able to edit project', async () => {
    let errorOccurred = false;

    const projectProps: ProjectProps = {
      name: Faker.name.firstName(),
      children: [],
      cover: undefined,
    };

    const modifyProject: ProjectProps = {
      name: Faker.name.firstName(),
      children: [],
      cover: undefined,
    };

    try {
      const addedProjectResult = await projectService.add(projectProps);
      const addedProject = addedProjectResult.getValue();

      expect(addedProjectResult.isSuccess).toBeTruthy();
      expect(addedProject).toEqual({ ...addedProject, ...projectProps });

      const deletedProjectResult = await projectService.edit(addedProject.id, modifyProject);
      const deletedProject = deletedProjectResult.getValue();

      expect(deletedProjectResult.isSuccess).toBeTruthy();
      expect(deletedProject).toBeTruthy();
    } catch (err) {
      errorOccurred = true;
    }

    expect(errorOccurred).toBeFalsy();
  });

  it('should be able to retrieve project by id', async () => {
    let errorOccurred = false;

    const projectProps: ProjectProps = {
      name: Faker.name.firstName(),
      children: [],
      cover: undefined,
    };

    try {
      const addedProjectResult = await projectService.add(projectProps);
      const addedProject = addedProjectResult.getValue();

      expect(addedProjectResult.isSuccess).toBeTruthy();
      expect(addedProject).toEqual({ ...addedProject, ...projectProps });

      const retrievedProjectResult = await projectService.findById(addedProject.id);
      const retrievedProject = retrievedProjectResult.getValue();

      expect(retrievedProjectResult.isSuccess).toBeTruthy();
      expect(retrievedProject).toEqual(addedProject);
    } catch (err) {
      errorOccurred = true;
    }

    expect(errorOccurred).toBeFalsy();
  });

  it('should be able to get projects', async () => {
    let errorOccurred = false;

    const projects: ProjectProps[] = [...Array(10)].map((_) => ({
      name: Faker.name.firstName(),
      children: [],
      cover: undefined,
    }));

    try {
      const addedProjects = await Promise.all(projects.map((c) => projectService.add(c)));

      expect(addedProjects.every((r) => r.isSuccess)).toBeTruthy();

      const retrievedProjectsResult = await projectService.getAll();
      const retrievedProjects = retrievedProjectsResult.getValue();

      expect(retrievedProjectsResult.isSuccess).toBeTruthy();
      expect(retrievedProjects.length).toEqual(projects.length);
    } catch (err) {
      errorOccurred = true;
    }

    expect(errorOccurred).toBeFalsy();
  });
});
