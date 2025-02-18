import React, { useState } from "react";
import styled from "styled-components";

const Form = styled.form`
  width: 100%;
  margin-bottom: 1rem;
`;

const Input = styled.input`
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

const Button = styled.button<{ disabled: boolean }>`
  background: #8758ff;
  color: #fff;
  border: none;
  padding: 0.55rem;
  cursor: ${({ disabled }) => (disabled ? "default" : "pointer")};
  transition: 0.2s;
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

interface ToDoFormProps {
  addTodo: (todo: string) => void;
}

export default function ToDoForm({ addTodo }: ToDoFormProps) {
  const [value, setValue] = useState("");
  const [formValide, setFormValide] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addTodo(value);
    setValue("");
    setFormValide(false);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Input
        value={value}
        type="text"
        placeholder="Что будем делать сегодня?"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setValue(e.target.value);
          setFormValide(e.target.value.trim() !== "");
        }}
      />
      <Button type="submit" disabled={!formValide}>
        Добавить задание
      </Button>
    </Form>
  );
}
