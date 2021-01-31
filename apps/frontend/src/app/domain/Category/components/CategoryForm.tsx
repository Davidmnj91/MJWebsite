import { CreateCategoryDto } from '@mj-website/api-interfaces';
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
import { useFormik } from 'formik';
import React from 'react';
import { Save, X } from 'react-feather';
import { useSelector } from 'react-redux';
import * as Yup from 'yup';
import { RootState } from '../..';
import { CategorySelectors } from '../Slice';

type CategoryFormProps = {
  initialCategory?: CreateCategoryDto;
  errors?: Record<keyof CreateCategoryDto, string>;
  handleCancel: () => void;
  handleSubmit: (category: CreateCategoryDto) => void;
};

const CategoryFormComponent: React.FunctionComponent<CategoryFormProps> = ({
  initialCategory,
  errors,
  handleSubmit,
  handleCancel,
}: CategoryFormProps) => {
  const formik = useFormik<CreateCategoryDto>({
    initialValues: {
      name: '',
      parent_id: '',
      children_ids: [],
      cover: null,
    },
    validationSchema: Yup.object().shape({
      name: Yup.string().required('Required'),
    }),
    onSubmit: (values) => {
      handleSubmit(values);
    },
    initialErrors: errors,
  });

  const { entities } = useSelector((state: RootState) => ({
    entities: CategorySelectors.selectAll(state.categories),
  }));

  const options = React.useRef(entities.filter((c) => !c.parent_id).map((c) => ({ item: `${c.id}`, caption: c.name })));

  return (
    <Card>
      <form onSubmit={formik.handleSubmit}>
        <CardHeader>
          <CardHeading>{initialCategory ? `Editing ${initialCategory.name}` : 'Create Category'}</CardHeading>
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
              <Label htmlFor="parent_id">Parent</Label>
              <Select id="parent_id" name="parent_id" value={formik.values.parent_id} onChange={formik.handleChange}>
                <option value={undefined}></option>
                {options.current.map(({ item, caption }) => (
                  <option key={item} value={item}>
                    {caption}
                  </option>
                ))}
              </Select>
              {formik.errors.parent_id && formik.touched.parent_id && (
                <FieldError>{formik.errors.parent_id}</FieldError>
              )}
            </FormField>
            <FormField>
              <Label htmlFor="media">Cover</Label>
              <Upload
                allowDrop
                id="file"
                name="file"
                changeCb={(event) => formik.setFieldValue('file', event.value[0])}
              />
              {formik.errors.cover && formik.touched.cover && <FieldError>{formik.errors.cover}</FieldError>}
              {formik.values.cover && (
                <UploadView>
                  <img width="200" src={URL.createObjectURL(formik.values.cover)} alt={formik.values.cover.name} />
                </UploadView>
              )}
            </FormField>
          </Form>
        </CardBody>
        <code>{JSON.stringify(formik.values)}</code>
      </form>
    </Card>
  );
};

export default CategoryFormComponent;
