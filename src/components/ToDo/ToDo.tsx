import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrash, faStar } from "@fortawesome/free-solid-svg-icons";
import { faStar as faStarRegular } from "@fortawesome/free-regular-svg-icons";
import { Todo, Text, Icons } from "./ToDo.styles";

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
