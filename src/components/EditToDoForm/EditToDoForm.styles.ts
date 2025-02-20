import styled from "styled-components";

export const Form = styled.form`
  width: 100%;
  margin-bottom: 1rem;
  border: 2px solid #8758ff;
  border-radius: 8px;
  padding: 1.5rem;
  position: relative;
  background: rgba(135, 88, 255, 0.05);
`;

export const Input = styled.input`
  outline: none;
  background: none;
  border: 1px solid #8758ff;
  padding: 0.8rem 1.2rem;
  margin: 1rem 0;
  width: 100%;
  color: #fff;
  border-radius: 5px;
  font-size: 1rem;

  &::placeholder {
    color: #ffffff80;
  }
`;

export const Button = styled.button<{ disabled: boolean }>`
  background: ${({ disabled }) => (disabled ? "#4a2a8a" : "#8758ff")};
  color: #fff;
  border: none;
  padding: 0.8rem 1.5rem;
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  transition: all 0.3s ease;
  border-radius: 5px;
  font-weight: 500;

  &:hover {
    background: ${({ disabled }) => (disabled ? "#4a2a8a" : "#6d3dda")};
    transform: ${({ disabled }) => (disabled ? "none" : "translateY(-1px)")};
  }
`;

export const InfoBlock = styled.div`
  background: rgba(135, 88, 255, 0.1);
  border-radius: 6px;
  padding: 1rem;
  margin: 1rem 0;

  div {
    margin: 0.5rem 0;
    display: flex;
    align-items: center;
  }

  label {
    display: inline-block;
    min-width: 80px;
    color: #8758ff;
    font-weight: 500;
    margin-right: 1rem;
  }

  span {
    color: #fff;
  }

  p {
    margin: 0 0 0 0;
    color: #e0e0e0;
    line-height: 1.4;
    word-wrap: break-word;
    overflow-wrap: break-word;
    word-break: break-word;
    max-width: 100%;
    white-space: pre-wrap;
  }
  input {
    outline: none;
    background: none;
    border: 1px solid #8758ff;
    padding: 0.4rem 0.6rem;
    width: 60%;
    color: #fff;
    border-radius: 5px;
    font-size: 1rem;

    &::placeholder {
      color: #ffffff80;
    }
  }
`;

export const Textarea = styled.textarea`
  outline: none;
  background: none;
  border: 1px solid #8758ff;
  padding: 0.4rem 0.6rem;
  width: 60%;
  color: #fff;
  border-radius: 5px;
  font-size: 1rem;
  resize: none;

  &::placeholder {
    color: #ffffff80;
  }

  height: auto;
  min-height: 40px;
  overflow-y: hidden;

  word-wrap: break-word;
  white-space: pre-wrap;
`;

export const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 1rem;
`;

export const ServerTag = styled.div<{ $isServer: boolean }>`
  position: absolute;
  top: -12px;
  left: 15px;
  background: ${({ $isServer }) => ($isServer ? "#8758ff" : "#7e9100")};
  color: white;
  padding: 4px 12px;
  border-radius: 15px;
  font-size: 0.8rem;
  font-weight: bold;
  text-transform: uppercase;
`;

export const ErrorDiv = styled.div`
  color: #e33327;
  margin-top: 10px;
  word-wrap: break-word;
  overflow-wrap: break-word;
`;

export const DivCentered = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
