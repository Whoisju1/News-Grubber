import React, { useState } from 'react'
import styled from 'styled-components';
import Form, { Label, FormHeading, Input, SubmitBtn } from '../../shared/FormElements';
import { UserCredentials } from '../../shared/contexts/authContext';

const Password = styled(Input).attrs({ type: 'password' })`
  /* ... */
`;

interface Props {
  handleSubmit: (userCredentials: UserCredentials) => void;
  formHeading: string;
  submitBtnValue: string;
}

const AuthForm: React.FC<Props> = ({ handleSubmit, formHeading, submitBtnValue }) => {
  const [state, setState] = useState({
    username: '',
    password: '',
  });

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;
    setState({ ...state, [name]: value });
  }

  return (
    <Form onSubmit={(e) => {
      e.preventDefault();
      handleSubmit(state);
    }}>
      <FormHeading>
        {formHeading}
      </FormHeading>
      <Label>
        Username
        <Input
          value={state.username}
          name="username"
          onChange={handleChange}
          required
          placeholder="Username"
        />
      </Label>
      <Label>
        Password
        <Password
          value={state.password}
          name="password"
          onChange={handleChange}
          required
          placeholder="Password"
        />
      </Label>
      <SubmitBtn value={submitBtnValue} />
    </Form>
  );
}

export default AuthForm;
