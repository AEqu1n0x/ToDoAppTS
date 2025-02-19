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
  const [filter, setFilter] = useState<string>("all");
  const [locallyUpdatedTaskId, setLocallyUpdatedTaskId] = useState<string | null>(null);

  const filteredTodos = todos.filter((todo) => {
    if (filter === "completed") return todo.completed;
    if (filter === "notCompleted") return !todo.completed;
    if (filter === "favorites") return todo.isFavorite;
    return true;
  });

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
    setTodos(
      (prev) => prev.map((t) => (t.id === id ? { ...t, task, isEditing: false } : t)) // Закрываем режим редактирования
    );
  };

  const editTaskDescription = (description: string, id: string) => {
    setTodos(
      (prev) => prev.map((t) => (t.id === id ? { ...t, description, isEditing: false } : t)) // Закрываем режим редактирования
    );
  };

  const toggleFavorite = (id: string) => {
    setTodos((prev) => prev.map((t) => (t.id === id ? { ...t, isFavorite: !t.isFavorite } : t)));
    console.log(todos);
  };

  const setLocallyUpdated = (id: string) => {
    setLocallyUpdatedTaskId(id);
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
            Тестовое задание выполнил Егоров Андрей. tg-@AlexEquinox. Добавленные списки задач
            хранятся локально, а также при мнотировании компонента происходит запрос на сервер для
            получения данных. Они объединяются и выводятся. Чтобы пометить задачу выполненной -
            нужно нажать на текст задачи. Чтобы добавить в избранное - нажать на икноку избранного.
            Чтобы отредактировать - нажать на кнопку редактирвоания. Для удаления - кнопку корзины.
          </ModalText>
          <CloseButton onClick={() => setIsModalOpen(false)}>Закрыть</CloseButton>
        </ModalContent>
      </InfoModal>

      <Wrapper>
        <IconWrapper>
          <Icon icon={faInfo} onClick={() => setIsModalOpen(true)} />
        </IconWrapper>
        <Title>Список дел</Title>
        <ToDoForm addTodo={addTodo} />
        {todos.length !== 0 && (
          <SortContainer>
            <SortTitle>Сортировать по:</SortTitle>
            <SortButtonGroup>
              <SortButton onClick={() => setFilter("all")}>Все</SortButton>
              <SortButton onClick={() => setFilter("completed")}>Выполненные</SortButton>
            </SortButtonGroup>
            <SortButtonGroup>
              <SortButton onClick={() => setFilter("notCompleted")}>Не выполненные</SortButton>
              <SortButton onClick={() => setFilter("favorites")}>Избранные</SortButton>
            </SortButtonGroup>
          </SortContainer>
        )}

        {loading ? (
          <SortTitle>Загрузка...</SortTitle>
        ) : filteredTodos.length === 0 ? (
          <EmptyListMessage>Список пуст</EmptyListMessage>
        ) : (
          <>
            {filteredTodos.map((todo) =>
              todo.isEditing ? (
                <EditToDoForm
                  key={todo.id}
                  task={todo}
                  editTodo={editTask}
                  editTaskDescription={editTaskDescription}
                  setLocallyUpdated={setLocallyUpdated}
                  deleteTodo={deleteTodo}
                  setTodos={setTodos}
                />
              ) : (
                <ToDo
                  key={todo.id}
                  task={todo}
                  toggleComplete={toggleComplete}
                  deleteTodo={deleteTodo}
                  editTodo={editTodo}
                  toggleFavorite={toggleFavorite}
                  isLocallyUpdated={locallyUpdatedTaskId === todo.id}
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
