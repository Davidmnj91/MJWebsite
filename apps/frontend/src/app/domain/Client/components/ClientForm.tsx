import { ClientProps } from '@mj-website/api-interfaces';
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
  TextArea,
} from '@mj-website/ui-components';
import { useFormik } from 'formik';
import React from 'react';
import { Save, X } from 'react-feather';
import * as Yup from 'yup';

type ClientFormProps = {
  initialClient?: ClientProps;
  errors?: Record<keyof ClientProps, string>;
  handleCancel: () => void;
  handleSubmit: (client: ClientProps) => void;
};

const ClientFormComponent: React.FunctionComponent<ClientFormProps> = ({
  initialClient,
  errors,
  handleSubmit,
  handleCancel,
}: ClientFormProps) => {
  const formik = useFormik<ClientProps>({
    initialValues: initialClient || {
      name: '',
      description: '',
    },
    validationSchema: Yup.object().shape({
      name: Yup.string().required('Required'),
    }),
    onSubmit: (values) => {
      handleSubmit(values);
    },
    initialErrors: errors,
  });

  return (
    <Card>
      <form onSubmit={formik.handleSubmit}>
        <CardHeader>
          <CardHeading>{initialClient ? `Editing ${initialClient.name}` : 'Create Client'}</CardHeading>
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
              <Label htmlFor="description">Description</Label>
              <TextArea
                id="description"
                name="description"
                onChange={formik.handleChange}
                value={formik.values.description}
              />
              {formik.errors.description && formik.touched.description && (
                <FieldError>{formik.errors.description}</FieldError>
              )}
            </FormField>
          </Form>
        </CardBody>
      </form>
    </Card>
  );
};

export default ClientFormComponent;
