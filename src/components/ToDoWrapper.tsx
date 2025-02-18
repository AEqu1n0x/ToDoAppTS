import { useState } from "react";
import styled from "styled-components";
import ToDoForm from "./ToDoForm";
import { v4 as uuidv4 } from "uuid";
import ToDo from "./ToDo";
import EditToDoForm from "./EditToDoForm";
import downloadTodoList from "../utils/DownloadFile";

const Container = styled.div`
  margin-top: 5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 495px;
  @media (max-width: 600px) {
    margin-top: 2rem;
  }
`;

const SortContainer = styled.div`
  margin-bottom: 1rem;
  text-align: center;
`;

const SortTitle = styled.h3`
  color: #fff;
  margin-bottom: 0.5rem;
`;

const SortButtonGroup = styled.div`
  display: flex;
  gap: 0.5rem;
  justify-content: center;
  padding-bottom: 10px;

  @media (max-width: 400px) {
    flex-direction: column;
    align-items: center;
  }
`;

const SortButton = styled.button`
  background: #8758ff;
  color: #fff;
  border: none;
  padding: 0.5rem 1rem;
  cursor: pointer;
  transition: 0.4s;
  border-radius: 5px;

  &:hover {
    background: #fff;
    color: #8758ff;
  }
`;
const Wrapper = styled.div`
  background: #1a1a40;
  padding: 2rem;
  border-radius: 5px;
  max-width: 495px;
`;

const Title = styled.h1`
  color: #fff;
  margin-bottom: 0.5rem;
  font-size: 1.75rem;
`;

const EmptyListMessage = styled.h3`
  color: #fff;
`;

const DownloadButton = styled.button`
  background: #8758ff;
  color: #fff;
  border: none;
  padding: 0.55rem;
  cursor: pointer;
  transition: 0.4s;
  border-radius: 5px;

  &:hover {
    background: #fff;
    color: #8758ff;
    transition: 0.4s;
  }

  &:disabled {
    background: #fff;
    color: #8758ff;
    cursor: default;
  }
`;

interface Todo {
  id: string;
  task: string;
  completed: boolean;
  isEditing: boolean;
  isFavorite: boolean;
}
interface props {}

export default function ToDoWrapper({}: props) {
  const [todos, setTodos] = useState<Todo[]>([]);

  const addTodo = (todo: string) => {
    setTodos([
      ...todos,
      { id: uuidv4(), task: todo, completed: false, isEditing: false, isFavorite: false },
    ]);
  };

  const toggleComplete = (id: string) => {
    setTodos(todos.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)));
  };

  const deleteTodo = (id: string) => {
    setTodos(todos.filter((t) => t.id !== id));
  };

  const editTodo = (id: string) => {
    setTodos(todos.map((t) => (t.id === id ? { ...t, isEditing: !t.isEditing } : t)));
  };

  const editTask = (task: string, id: string) => {
    setTodos(todos.map((t) => (t.id === id ? { ...t, task, isEditing: !t.isEditing } : t)));
  };

  const toggleFavorite = (id: string) => {
    setTodos(todos.map((t) => (t.id === id ? { ...t, isFavorite: !t.isFavorite } : t)));
  };

  const handleDownload = () => {
    downloadTodoList(todos);
  };

  return (
    <Container>
      <Wrapper>
        <Title>Список дел</Title>
        <ToDoForm addTodo={addTodo} />
        {todos.length !== 0 && (
          <SortContainer>
            <SortTitle>Сортировать по:</SortTitle>
            <SortButtonGroup>
              <SortButton>Все</SortButton>
              <SortButton>Выполненные</SortButton>
            </SortButtonGroup>
            <SortButtonGroup>
              <SortButton>Не выполненные</SortButton>
              <SortButton>Избранные</SortButton>
            </SortButtonGroup>
          </SortContainer>
        )}

        {todos.map((todo) =>
          todo.isEditing ? (
            <EditToDoForm key={todo.id} task={todo} editTodo={editTask} />
          ) : (
            <ToDo
              key={todo.id}
              task={todo}
              toggleComplete={toggleComplete}
              deleteTodo={deleteTodo}
              editTodo={editTodo}
              toggleFavorite={toggleFavorite}
            />
          )
        )}
        {todos.length === 0 && <EmptyListMessage>Список пуст</EmptyListMessage>}
        {todos.length !== 0 && (
          <DownloadButton onClick={handleDownload}>Скачать список дел</DownloadButton>
        )}
      </Wrapper>
    </Container>
  );
}
