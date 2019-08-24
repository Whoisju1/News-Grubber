import React, { useState } from 'react'
import styled from 'styled-components';
import Form, { Label, FormHeading, Input, SubmitBtn } from '../../shared/FormElements';
import { UserCredentials } from '../../shared/contexts/authContext';

const Password = styled(Input).attrs({ type: 'password' })`
  /* ... */
`;

const StyledForm = styled(Form)`
  display: grid;
  min-width: 27rem;
  grid-row-gap: 2.5rem;
  grid-template-columns: 2rem auto 2rem;
  grid-template-rows: 7rem 5rem 5rem 5rem 1rem;
  grid-template-areas:
    "heading heading heading"
    ". username ."
    ". password ."
    ". submit ."
    ". . .";
  input:not([type="submit"]) {
    border: none;
    outline: none;
    border-bottom: .04px solid lightgray;
    position: absolute;
    bottom: 0;
    left: 0;
    height: 50%;
    width: 100%;
  }
  h1 {
    text-align: center;
    background-color: var(--primary-color);
    color: #ffffff;
    grid-area: heading;
    font-size: 3.4rem;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
    display: grid;
    align-items: center;
    font-family: sans-serif;
    font-weight: lighter;
  }
  .username-wrapper {
      grid-area: username;
  }
  .password-wrapper {
      grid-area: password;
  }
  .input-wrapper {
    position: relative;
    height: 100%;
    width: 100%;
  }

  input ~ label {
    position: absolute;
    bottom: 0;
    left: 0;
    height: 40%;
    width: 100%;
    pointer-events: none;
    transform-origin: 0%;
    transition: transform .3s ease;
    color: gray;
    font-weight: lighter;
    color: #95a5a6;
  }

  input {
    color: #2d3436;
    &:invalid {
      outline: none;
    }
  }

  input:focus ~ label,
  input:not(:focus):valid ~ label {
    transform: translateY(-3.4rem);
    color: #74b9ff;
  }

  input:focus {
    border-bottom: .2rem solid var(--primary-color);
  }

  input[type='submit'] {
    background: transparent;
    border-radius: 20px;
    border: 2px solid var(--primary-color);
    color: var(--primary-color);
    grid-area: submit;
    height: 100%;
  }
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
    <StyledForm onSubmit={(e) => {
      e.preventDefault();
      handleSubmit(state);
    }}>
      <FormHeading>
        {formHeading}
      </FormHeading>
      <div className="input-wrapper username-wrapper">
        <Input
          value={state.username}
          name="username"
          onChange={handleChange}
          required
          autoComplete="off"
        />
        <Label>
          Username
        </Label>
      </div>
      <div className="input-wrapper password-wrapper">
        <Password
          value={state.password}
          name="password"
          onChange={handleChange}
          required
        />
        <Label>
          Password
        </Label>
      </div>
      <SubmitBtn value={submitBtnValue} />
    </StyledForm>
  );
}

export default AuthForm;
