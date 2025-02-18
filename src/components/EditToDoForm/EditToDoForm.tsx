import React, { useState } from "react";
import { Form, Input, Button } from "./EditToDoForm.styles";

interface EditToDoFormProps {
  editTodo: (task: string, id: string) => void;
  task: {
    id: string;
    task: string;
  };
}

export default function EditToDoForm({ editTodo, task }: EditToDoFormProps) {
  const [value, setValue] = useState(task.task);
  const [formValide, setFormValide] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    editTodo(value, task.id);
    setValue("");
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Input
        value={value}
        type="text"
        placeholder="Обновите задание"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setValue(e.target.value);
          setFormValide(e.target.value.trim() !== "");
        }}
      />
      <Button type="submit" disabled={!formValide}>
        Изменить
      </Button>
    </Form>
  );
}
