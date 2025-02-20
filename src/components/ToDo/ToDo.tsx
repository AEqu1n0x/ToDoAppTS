import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPenToSquare,
  faTrash,
  faStar,
  faExclamation,
  faSpinner,
} from "@fortawesome/free-solid-svg-icons";
import { faStar as faStarRegular } from "@fortawesome/free-regular-svg-icons";
import { Todo, Text, Icons, IconWrapper } from "./ToDo.styles";
import axios from "axios";
import { useState } from "react";

interface TodoProps {
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
  toggleComplete: (id: string) => void;
  deleteTodo: (id: string) => void;
  editTodo: (id: string) => void;
  toggleFavorite: (id: string) => void;
  isLocallyUpdated: boolean;
}

export default function ToDo({
  task,
  toggleComplete,
  deleteTodo,
  editTodo,
  toggleFavorite,
  isLocallyUpdated,
}: TodoProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  const isServerTask = task.createdAt !== undefined;

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await axios.delete(`https://cms.laurence.host/api/tasks/${task.id}`);
      deleteTodo(task.id);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 404) {
          console.warn("Задача не найдена на сервере, удаляем локально.");
          deleteTodo(task.id);
        } else {
          console.error("Ошибка удаления задачи:", error);
        }
      }
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <Todo>
      <Text onClick={() => toggleComplete(task.id)} className={task.completed ? "completed" : ""}>
        {(isLocallyUpdated || !isServerTask) && (
          <IconWrapper>
            <FontAwesomeIcon icon={faExclamation} style={{ marginRight: "8px", color: "orange" }} />
            <span className="tooltip-text">
              {isLocallyUpdated ? "Задача изменена локально" : "Задача не сохранена на сервере"}
            </span>
          </IconWrapper>
        )}

        {task.task}
      </Text>
      <Icons>
        <FontAwesomeIcon
          icon={task.isFavorite ? faStar : faStarRegular}
          onClick={() => toggleFavorite(task.id)}
          data-testid="favorite-icon"
        />
        <FontAwesomeIcon
          icon={faPenToSquare}
          onClick={() => editTodo(task.id)}
          data-testid="edit-icon"
        />

        {isServerTask ? (
          isDeleting ? (
            <FontAwesomeIcon icon={faSpinner} />
          ) : (
            <FontAwesomeIcon icon={faTrash} onClick={handleDelete} />
          )
        ) : (
          <FontAwesomeIcon
            aria-label="Удалить"
            icon={faTrash}
            onClick={() => deleteTodo(task.id)}
            data-testid="delete-icon"
          />
        )}
      </Icons>
    </Todo>
  );
}
