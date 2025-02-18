import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrash, faStar } from "@fortawesome/free-solid-svg-icons";
import { faStar as faStarRegular } from "@fortawesome/free-regular-svg-icons";
import styled from "styled-components";

const Todo = styled.div`
  max-width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #8758ff;
  color: #fff;
  padding: 0.75rem 1rem;
  border-radius: 5px;
  margin-bottom: 1rem;
  transition: 0.4s;
  word-break: break-word;

  &:hover {
    background: #fff;
    color: #8758ff;
    transition: 0.4s;
  }
`;

const Text = styled.p`
  max-width: 85%;
  cursor: pointer;

  &.completed {
    color: #c5aeff;
    text-decoration: line-through;
  }
`;

const Icons = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;

  .fa-trash,
  .fa-star,
  .fa-star-regular,
  .fa-pen-to-square {
    cursor: pointer;
  }
`;

interface TodoProps {
  task: {
    id: string;
    task: string;
    completed: boolean;
    isFavorite: boolean;
  };
  toggleComplete: (id: string) => void;
  deleteTodo: (id: string) => void;
  editTodo: (id: string) => void;
  toggleFavorite: (id: string) => void;
}

export default function ToDo({
  task,
  toggleComplete,
  deleteTodo,
  editTodo,
  toggleFavorite,
}: TodoProps) {
  return (
    <Todo>
      <Text onClick={() => toggleComplete(task.id)} className={task.completed ? "completed" : ""}>
        {task.task}
      </Text>
      <Icons>
        <FontAwesomeIcon
          icon={task.isFavorite ? faStar : faStarRegular}
          onClick={() => toggleFavorite(task.id)}
        />
        <FontAwesomeIcon icon={faPenToSquare} onClick={() => editTodo(task.id)} />
        <FontAwesomeIcon icon={faTrash} onClick={() => deleteTodo(task.id)} />
      </Icons>
    </Todo>
  );
}
