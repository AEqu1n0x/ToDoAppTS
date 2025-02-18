import ToDoForm from "../ToDoForm/ToDoForm";
import { v4 as uuidv4 } from "uuid";
import ToDo from "../ToDo/ToDo";
import EditToDoForm from "../EditToDoForm/EditToDoForm";
import downloadTodoList from "../../utils/DownloadFile";
import { useTodos } from "../../hooks/useTodos";
import InfoModal from "../../modals/InfoModal";
import { useState } from "react";
import { faInfo } from "@fortawesome/free-solid-svg-icons";
import {
  Container,
  SortContainer,
  SortTitle,
  SortButtonGroup,
  SortButton,
  Wrapper,
  Title,
  EmptyListMessage,
  DownloadButton,
  ModalContent,
  ModalTitle,
  ModalText,
  CloseButton,
  IconWrapper,
  Icon,
} from "./ToDoWrapper.style";

export default function ToDoWrapper() {
  const { todos, setTodos, loading } = useTodos();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const addTodo = (task: string) => {
    const newTodo = {
      id: uuidv4(),
      task,
      completed: false,
      isEditing: false,
      isFavorite: false,
      status: "Не выполнена",
    };
    setTodos((prev) => [newTodo, ...prev]);
  };

  const toggleComplete = (id: string) => {
    setTodos((prev) => prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)));
  };

  const deleteTodo = (id: string) => {
    setTodos((prev) => prev.filter((t) => t.id !== id));
  };

  const editTodo = (id: string) => {
    setTodos((prev) => prev.map((t) => (t.id === id ? { ...t, isEditing: !t.isEditing } : t)));
  };

  const editTask = (task: string, id: string) => {
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, task, isEditing: !t.isEditing } : t))
    );
  };

  const toggleFavorite = (id: string) => {
    setTodos((prev) => prev.map((t) => (t.id === id ? { ...t, isFavorite: !t.isFavorite } : t)));
    console.log(todos)
  };

  const handleDownload = () => {
    downloadTodoList(
      todos.map((todo) => ({
        ...todo,
        id: String(todo.id),
        description: todo.description || "",
      }))
    );
  };

  return (
    <Container>
      <InfoModal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <ModalContent>
          <ModalTitle>Информация о приложении</ModalTitle>
          <ModalText>
            Тестовое задание выполнил Егоров Андрей. tg-@AlexEquinox. Добавленные списки задач хранятся локально, а также при мнотировании компонента происходит запрос на сервер для получения данных. Они объединяются и выводятся.
          </ModalText>
          <CloseButton onClick={() => setIsModalOpen(false)}>Закрыть</CloseButton>
        </ModalContent>
      </InfoModal>
      <IconWrapper>
        <Icon icon={faInfo} onClick={() => setIsModalOpen(true)} />
      </IconWrapper>
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

        {loading ? (
          <SortTitle>Загрузка...</SortTitle>
        ) : todos.length === 0 ? (
          <EmptyListMessage>Список пуст</EmptyListMessage>
        ) : (
          <>
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
            <DownloadButton onClick={handleDownload}>Скачать список дел</DownloadButton>
          </>
        )}
      </Wrapper>
    </Container>
  );
}
