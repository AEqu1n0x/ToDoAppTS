import React, { useState } from "react";
import axios from "axios";
import {
  Form,
  Input,
  Button,
  InfoBlock,
  ButtonGroup,
  ServerTag,
  Textarea,
  ErrorDiv,
} from "./EditToDoForm.styles";

interface EditToDoFormProps {
  editTodo: (task: string, id: string) => void;
  editTaskDescription: (description: string, id: string) => void;
  task: {
    id: string;
    task: string;
    completed: boolean;
    isFavorite: boolean;
    createdAt?: string;
    status?: string;
    description?: string;
    updatedAt?: string;
  };
  setLocallyUpdated: (id: string) => void;
  deleteTodo: (id: string) => void;
  setTodos: (todos: any[]) => void;
}

export default function EditToDoForm({
  editTaskDescription,
  editTodo,
  task,
  setLocallyUpdated,
  deleteTodo,
  setTodos,
}: EditToDoFormProps) {
  const [value, setValue] = useState(task.task);
  const [valueDescription, setValueDescription] = useState(task.description || "");
  const [formValid, setFormValid] = useState(false);
  const isServerTask = !!task.createdAt;
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const validateForm = (taskValue: string, descValue: string) => {
    setFormValid(taskValue.trim() !== "" || descValue.trim() !== "");
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    editTodo(value, task.id);
    editTaskDescription(valueDescription, task.id);
    setLocallyUpdated(task.id);
    setValue("");
    setValueDescription("");
  };

  const handleSaveToServer = async () => {
    setIsSaving(true);
    setError(null);

    try {
      const response = await axios.post("https://cms.laurence.host/api/tasks", {
        data: {
          status: task.completed ? "Выполнена" : "Не выполнена",
          title: value,
          description: valueDescription,
        },
      });

      const result = response.data;
      const updatedTask = {
        ...task,
        id: result.data.id.toString(),
        createdAt: result.data.attributes.createdAt,
        updatedAt: result.data.attributes.updatedAt,
        publishedAt: result.data.attributes.publishedAt,
        description: result.data.attributes.description,
      };

      deleteTodo(task.id);
      const todos = JSON.parse(localStorage.getItem("todos") || "[]").filter(
        (t: any) => t.id !== task.id
      );
      const updatedTodos = [...todos, updatedTask];
      localStorage.setItem("todos", JSON.stringify(updatedTodos));
      setTodos(updatedTodos);
      editTodo(updatedTask.task, updatedTask.id);
      editTaskDescription(updatedTask.description || "", updatedTask.id);
      setLocallyUpdated(updatedTask.id);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Неизвестная ошибка");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <ServerTag isServer={isServerTask}>
        {isServerTask ? "Серверная задача" : "Локальная задача"}
      </ServerTag>

      <InfoBlock>
        {task.createdAt && (
          <div>
            <label>Создана:</label>
            <span>{new Date(task.createdAt).toLocaleString()}</span>
          </div>
        )}
        {task.updatedAt && (
          <div>
            <label>Обновлена:</label>
            <span>{new Date(task.updatedAt).toLocaleString()}</span>
          </div>
        )}
        {task.status && (
          <div>
            <label>Статус:</label>
            <p>{task.completed ? "Выполнена" : "В процессе"} </p>
          </div>
        )}
        <div>
          <label>Описание:</label>
          <Textarea
            value={valueDescription}
            placeholder={task.description ? task.description : "Отсутствует"}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
              setValueDescription(e.target.value);
              validateForm(value, e.target.value);
            }}
          />
        </div>
      </InfoBlock>

      <Input
        value={value}
        type="text"
        placeholder="Введите новый текст задачи"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setValue(e.target.value);
          setFormValid(e.target.value.trim() !== "");
        }}
      />

      <ButtonGroup>
        <Button type="submit" disabled={!formValid}>
          Изменить локально
        </Button>
        {task.createdAt ? (
          <>
            <Button type="button" disabled={!formValid} style={{ marginLeft: "10px" }}>
              Обновить на сервере
            </Button>
          </>
        ) : (
          <>
            <Button
              type="button"
              disabled={!formValid || isSaving}
              onClick={handleSaveToServer}
              style={{ marginLeft: "10px" }}
            >
              {!isSaving && "Сохранить на сервере"}
              {isSaving && "Сохранение..."}
            </Button>
          </>
        )}
      </ButtonGroup>
      {error && <ErrorDiv>{error}</ErrorDiv>}
    </Form>
  );
}
