import styled from "styled-components";

export const Form = styled.form`
  width: 100%;
  margin-bottom: 1rem;
`;

export const Input = styled.input`
  outline: none;
  background: none;
  border: 1px solid #8758ff;
  padding: 0.5rem 1rem;
  margin-top: 1rem;
  margin-bottom: 2rem;
  width: 300px;
  color: #fff;
  border-radius: 5px;

  &::placeholder {
    color: #ffffff4d;
  }
`;

export const Button = styled.button<{ disabled: boolean }>`
  background: #8758ff;
  color: #fff;
  border: none;
  padding: 0.55rem;
  cursor: ${({ disabled }) => (disabled ? "default" : "pointer")};
  transition: 0.4s;
  border-radius: 5px;

  &:disabled {
    background: #fff;
    color: #8758ff;
  }

  &:hover {
    background: #fff;
    color: #8758ff;
    transition: 0.4s;
  }
`;