import { AuthProps } from '@mj-website/api-interfaces';
import { HttpError } from '@mj-website/http';
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  CardHeading,
  FieldError,
  Form,
  FormField,
  Input,
  Label,
} from '@mj-website/ui-components';
import { useFormik } from 'formik';
import React, { useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import * as Yup from 'yup';
import authService from '../services/AuthService';
import http from '../services/http';

type LoginProps = {
  handleSubmit: (login: AuthProps) => void;
  errors?: string;
};

const LoginRequest = ({ auth_code }: AuthProps, state?: string): Promise<{ access_token: string }> => {
  return http.get<{ access_token: string }>(`${process.env.NX_API_URL}auth?auth_code=${auth_code}&state=${state}`);
};

const LoginForm = ({ handleSubmit, errors }: LoginProps) => {
  const formik = useFormik<AuthProps>({
    initialValues: {
      auth_code: '',
      state: '',
    },
    validationSchema: Yup.object().shape({
      auth_code: Yup.string()
        .required('Required')
        .matches(/^\d{6}$/, 'Auth Code must be 6 numbers long'),
    }),
    onSubmit: (values) => {
      handleSubmit(values);
    },
  });
  return (
    <form onSubmit={formik.handleSubmit}>
      <Form>
        <FormField>
          <Label htmlFor="code">Code</Label>
          <Input
            style={{ letterSpacing: '1.2rem', textAlign: 'justify' }}
            id="code"
            name="auth_code"
            onChange={formik.handleChange}
            value={formik.values.auth_code}
          />
          {formik.errors.auth_code && formik.touched.auth_code && <FieldError>{formik.errors.auth_code}</FieldError>}
        </FormField>
        {errors && <FieldError>{errors}</FieldError>}
        <Button primary type="submit">
          Submit
        </Button>
      </Form>
    </form>
  );
};

const LoginContainer = styled.div`
  margin: 50px auto;
  width: 300px;
  display: flex;
  justify-content: center;
`;

const Login: React.FunctionComponent<LoginProps> = () => {
  const location = useLocation<{ from: string }>();
  const history = useHistory();

  const [getError, setError] = useState('');

  const handleSubmit = (auth: AuthProps) => {
    LoginRequest(auth, 'test')
      .then((r) => {
        authService.token = r.access_token;
        history.push(location.state?.from || '/admin');
      })
      .catch((err: HttpError) => {
        setError(err.message);
      });
  };

  return (
    <LoginContainer>
      <Card>
        <CardHeader style={{ justifyContent: 'center', padding: '30px' }}>
          <CardHeading>Login</CardHeading>
        </CardHeader>
        <CardBody>
          <LoginForm handleSubmit={handleSubmit} errors={getError} />
        </CardBody>
      </Card>
    </LoginContainer>
  );
};

export default Login;
