import React, { useState } from "react";
import { Form, Input, Button } from "./ToDoForm.style";

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
