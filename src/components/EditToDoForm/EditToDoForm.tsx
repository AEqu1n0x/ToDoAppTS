import React, { useCallback, useEffect, useState } from "react";
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
  DivCentered,
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
  setLocallyUpdated: (id: string | null) => void;
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
  const isServerTask = !!task.createdAt;
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [isDirty, setIsDirty] = useState(false);

  const checkChanges = useCallback(() => {
    const titleChanged = value.trim() !== task.task.trim();
    const descChanged = valueDescription.trim() !== (task.description?.trim() || "");

    return titleChanged || descChanged;
  }, [value, valueDescription, task.task, task.description]);

  useEffect(() => {
    console.log(task);
    setIsDirty(checkChanges());
  }, [value, valueDescription, task.completed, checkChanges]);

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

      setLocallyUpdated(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Неизвестная ошибка");
    } finally {
      setIsSaving(false);
    }
  };

  const handleUpdateToServer = async () => {
    if (!task.id) return;

    setIsSaving(true);
    setError(null);

    try {
      const response = await axios.put(`https://cms.laurence.host/api/tasks/${task.id}`, {
        data: {
          status: task.completed ? "Выполнена" : "Не выполнена",
          title: value,
          description: valueDescription,
        },
      });

      const result = response.data;
      const updatedTask = {
        ...task,
        title: result.data.attributes.title,
        updatedAt: result.data.attributes.updatedAt,
        description: result.data.attributes.description,
      };

      deleteTodo(task.id);
      const todos = JSON.parse(localStorage.getItem("todos") || "[]").filter(
        (t: any) => t.id !== task.id
      );
      const updatedTodos = [...todos, updatedTask];
      localStorage.setItem("todos", JSON.stringify(updatedTodos));
      setTodos(updatedTodos);
      editTodo(updatedTask.title, updatedTask.id);
      editTaskDescription(updatedTask.description || "", updatedTask.id);

      setLocallyUpdated(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Неизвестная ошибка");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <ServerTag $isServer={isServerTask}>
        {isServerTask ? "Серверная задача" : "Локальная задача"}
      </ServerTag>

      <InfoBlock>
        {task.createdAt && (
          <DivCentered>
            <label>Создана:</label>
            <span>{new Date(task.createdAt).toLocaleString()}</span>
          </DivCentered>
        )}
        {task.updatedAt && (
          <DivCentered>
            <label>Обновлена:</label>
            <span>{new Date(task.updatedAt).toLocaleString()}</span>
          </DivCentered>
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
        }}
      />

      <ButtonGroup>
        <Button type="submit" disabled={false}>
          Изменить локально
        </Button>
        {task.createdAt ? (
          <>
            <Button
              onClick={handleUpdateToServer}
              type="button"
              disabled={!isDirty || isSaving}
              style={{ marginLeft: "10px" }}
            >
              {isSaving ? "Обновление..." : "Обновить на сервере"}
            </Button>
          </>
        ) : (
          <>
            <Button
              type="button"
              disabled={isSaving}
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
