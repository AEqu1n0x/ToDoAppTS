import { useState, useEffect, useCallback } from "react";
import axios from "axios";

interface ApiTodo {
  id: number;
  attributes: {
    title: string;
    status: string;
    description?: string;
    createdAt: string;
    updatedAt: string;
  };
}

interface Todo {
  id: string;
  task: string;
  completed: boolean;
  isEditing: boolean;
  isFavorite: boolean;
  status: string;
  description?: string;
  createdAt?: string;
  updatedAt?: string;
}

export function useTodos() {
  const [todos, setTodos] = useState<Todo[]>(() => {
    const savedTodos = localStorage.getItem("todos");
    return savedTodos ? JSON.parse(savedTodos) : [];
  });
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const fetchTodos = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axios.get<{
        data: ApiTodo[];
        meta: { pagination: { pageCount: number } };
      }>(`https://cms.laurence.host/api/tasks?pagination[page]=${page}`);

      const { data: apiData, meta } = response.data;

      const completedStatuses = [
        "Выполнена", "Сделана", "Готово", "Исполнено", "Завершено", "Закрыта", "Done",
        "Завершена", "Финиш", "Выполнено", "Окончено", "Сделано", "Успешно",
        "Resolved", "Completed", "Finished", "Closed"
      ];

      const serverTodos: Todo[] = apiData.map((item) => ({
        id: String(item.id),
        task: item.attributes.title,
        completed: completedStatuses.includes(item.attributes.status),
        isEditing: false,
        isFavorite: false,
        status: item.attributes.status,
        description: item.attributes.description,
        createdAt: item.attributes.createdAt,
        updatedAt: item.attributes.updatedAt,
      }));

      setTodos((prev) => {
        const localTodos = prev.filter((t) => !t.createdAt); 
        const updatedServerTodos = serverTodos.map((st) => {
          const existing = prev.find((t) => t.id === st.id);
          return existing
            ? { ...st, isFavorite: existing.isFavorite, isEditing: existing.isEditing }
            : st;
        });

        return [...localTodos, ...updatedServerTodos];
      });
      setTotalPages(meta.pagination.pageCount);
    } catch (error) {
      console.error("Ошибка загрузки задач:", error);
    } finally {
      setLoading(false);
    }
  }, [page]);

  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop <
          document.documentElement.offsetHeight - 100 ||
        loading ||
        page >= totalPages
      )
        return;
      setPage((prev) => prev + 1);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loading, page, totalPages]);

  return { todos, setTodos, loading };
}
