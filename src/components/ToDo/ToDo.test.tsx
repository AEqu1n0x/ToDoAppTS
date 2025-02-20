import { render, screen, fireEvent } from "@testing-library/react";
import ToDo from "./ToDo"; 
import '@testing-library/jest-dom'; 
import { vi } from "vitest"; 

describe("ToDo Component", () => {
  const todo = {
    id: "1",
    task: "Протестировать ToDo",
    completed: false,
    isFavorite: false,
  };

  const mockToggleComplete = vi.fn();
  const mockEditTodo = vi.fn();
  const mockToggleFavorite = vi.fn();
  const mockDeleteTodo = vi.fn();

  it("отображает задачу", () => {
    render(
      <ToDo
        task={todo}
        toggleComplete={mockToggleComplete}
        deleteTodo={mockDeleteTodo}
        editTodo={mockEditTodo}
        toggleFavorite={mockToggleFavorite}
        isLocallyUpdated={false}
      /> 
    );

    // Проверяем, что задача отображается на экране
    expect(screen.getByText("Протестировать ToDo")).toBeInTheDocument();
  });

  it("вызывает toggleComplete при клике на текст", () => {
    render(
      <ToDo
        task={todo}
        toggleComplete={mockToggleComplete}
        deleteTodo={mockDeleteTodo}
        editTodo={mockEditTodo}
        toggleFavorite={mockToggleFavorite}
        isLocallyUpdated={false}
      />
    );

    // Находим текст задачи и кликаем по нему
    fireEvent.click(screen.getByText("Протестировать ToDo"));

    // Проверяем, что функция toggleComplete была вызвана
    expect(mockToggleComplete).toHaveBeenCalledWith("1");
  });

  it("вызывает editTodo при клике на иконку редактирования", () => {
    render(
      <ToDo
        task={todo}
        toggleComplete={mockToggleComplete}
        deleteTodo={mockDeleteTodo}
        editTodo={mockEditTodo}
        toggleFavorite={mockToggleFavorite}
        isLocallyUpdated={false}
      />
    );

    // Находим иконку редактирования по data-testid и кликаем по ней
    fireEvent.click(screen.getByTestId("edit-icon"));

    // Проверяем, что функция editTodo была вызвана
    expect(mockEditTodo).toHaveBeenCalledWith("1");
  });

  it("вызывает toggleFavorite при клике на иконку звезды", () => {
    render(
      <ToDo
        task={todo}
        toggleComplete={mockToggleComplete}
        deleteTodo={mockDeleteTodo}
        editTodo={mockEditTodo}
        toggleFavorite={mockToggleFavorite}
        isLocallyUpdated={false}
      />
    );

    // Находим иконку звезды по data-testid и кликаем по ней
    fireEvent.click(screen.getByTestId("favorite-icon"));

    // Проверяем, что функция toggleFavorite была вызвана
    expect(mockToggleFavorite).toHaveBeenCalledWith("1");
  });
 
  it("удаляет задачу при клике на корзину", () => {
    render(
      <ToDo
        task={todo}
        toggleComplete={mockToggleComplete}
        deleteTodo={mockDeleteTodo}  // Здесь используется mockDeleteTodo
        editTodo={mockEditTodo}
        toggleFavorite={mockToggleFavorite}
        isLocallyUpdated={false}
      />
    );

    // Находим иконку корзины по data-testid и кликаем по ней
    fireEvent.click(screen.getByTestId("delete-icon"));

    // Проверяем, что функция удаления задачи была вызвана с нужным параметром
    expect(mockDeleteTodo).toHaveBeenCalledWith("1");
  });
});