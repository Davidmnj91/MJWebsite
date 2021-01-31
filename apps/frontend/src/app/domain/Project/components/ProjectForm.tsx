import { CreateProjectDto } from '@mj-website/api-interfaces';
import {
  Card,
  CardBody,
  CardHeader,
  CardHeading,
  FieldError,
  Form,
  FormField,
  IconButton,
  Input,
  Label,
  Select,
  Upload,
  UploadView,
} from '@mj-website/ui-components';
import { FormikErrors, useFormik } from 'formik';
import React from 'react';
import { Save, X } from 'react-feather';
import { useSelector } from 'react-redux';
import * as Yup from 'yup';
import { RootState } from '../..';
import { CategorySelectors } from '../../Category/Slice';
import { ClientSelectors } from '../../Client/Slice';

type ProjectFormProps = {
  initialProject?: CreateProjectDto;
  errors?: FormikErrors<CreateProjectDto>;
  handleCancel: () => void;
  handleSubmit: (project: CreateProjectDto) => void;
};

const ProjectFormComponent: React.FunctionComponent<ProjectFormProps> = ({
  initialProject,
  errors,
  handleSubmit,
  handleCancel,
}: ProjectFormProps) => {
  const formik = useFormik({
    initialValues: {
      name: initialProject?.name || '',
      category_id: initialProject?.category_id || '',
      client_id: initialProject?.client_id || '',
      photos: initialProject?.photos || [],
      images: [],
    },
    validationSchema: Yup.object().shape({
      name: Yup.string().required('Required'),
      category_id: Yup.string().required('Required'),
      client_id: Yup.string().required('Required'),
    }),
    onSubmit: (values) => {
      handleSubmit(values);
    },
    initialErrors: errors,
  });

  const { clients, categories } = useSelector((state: RootState) => ({
    categories: CategorySelectors.selectAll(state.categories),
    clients: ClientSelectors.selectAll(state.clients),
  }));

  const addFile = (files: File[]) => {
    const photosLength = formik.values.photos.length;
    const photos = [...formik.values.photos, ...files.map((f, i) => ({ order: photosLength + i, image: f.name }))];
    const images = [...formik.values.images, ...files];
    formik.setFieldValue('photos', photos);
    formik.setFieldValue('images', images);
  };

  return (
    <Card>
      <form onSubmit={formik.handleSubmit}>
        <CardHeader>
          <CardHeading>{initialProject ? `Editing ${initialProject.name}` : 'Create Project'}</CardHeading>
          <div style={{ display: 'flex', gridGap: '0 5px' }}>
            <IconButton primary disabled={!formik.dirty} title="Edit" aria-label="Edit" type="submit">
              <Save />
            </IconButton>
            <IconButton title="Cancel" aria-label="Cancel" onClick={handleCancel}>
              <X />
            </IconButton>
          </div>
        </CardHeader>
        <CardBody>
          <Form>
            <FormField>
              <Label htmlFor="name">Name</Label>
              <Input id="name" name="name" onChange={formik.handleChange} value={formik.values.name} />
              {formik.errors.name && formik.touched.name && <FieldError>{formik.errors.name}</FieldError>}
            </FormField>
            <FormField>
              <Label htmlFor="category_id">Category</Label>
              <Select
                id="category_id"
                name="category_id"
                value={formik.values.category_id}
                onChange={formik.handleChange}
              >
                <option></option>
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </Select>
              {formik.errors.category_id && formik.touched.category_id && (
                <FieldError>{formik.errors.category_id}</FieldError>
              )}
            </FormField>
            <FormField>
              <Label htmlFor="client_id">Client</Label>
              <Select id="client_id" name="client_id" value={formik.values.client_id} onChange={formik.handleChange}>
                <option></option>
                {clients.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </Select>
              {formik.errors.client_id && formik.touched.client_id && (
                <FieldError>{formik.errors.client_id}</FieldError>
              )}
            </FormField>
            <FormField>
              <Label htmlFor="files">Photos</Label>
              <Upload allowDrop multi id="files" name="files" changeCb={(event) => addFile(event.value)} />
              {formik.errors.photos && formik.touched.photos && <FieldError>{formik.errors.photos}</FieldError>}
              {formik.values.photos && formik.values.photos.length && (
                <UploadView>
                  {formik.values.photos.map((f) => (
                    <img
                      width="200"
                      key={f.order}
                      src={URL.createObjectURL(formik.values.images[f.order])}
                      alt={f.image}
                    />
                  ))}
                </UploadView>
              )}
            </FormField>
          </Form>
        </CardBody>
        <h3>{JSON.stringify(formik.values)}</h3>
      </form>
    </Card>
  );
};

export default ProjectFormComponent;
