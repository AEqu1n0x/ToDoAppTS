interface Todo {
  id: string;
  task: string;
  completed: boolean;
  isFavorite: boolean;
}

export default function downloadTodoList(todos: Todo[]): void {
  const notCompleted = todos
    .filter((t) => !t.completed)
    .map((t) => `Задание(${t.isFavorite ? "Избранное" : ""}): ${t.task} `);
  const completed = todos
    .filter((t) => t.completed)
    .map((t) => `Задание(${t.isFavorite ? "Избранное" : ""}): ${t.task} `);

  const notCompletedContent = notCompleted.length
    ? `Не выполнено:\n${notCompleted.join("\n")}`
    : "Не выполнено: Нет заданий";

  const completedContent = completed.length
    ? `Выполнено:\n${completed.join("\n")}`
    : "Выполнено: Нет заданий";

  const content = `${notCompletedContent}\n\n${completedContent}`;

  const blob = new Blob([content], { type: "text/plain;charset=utf-8" });

  const url = document.createElement("a");
  url.href = URL.createObjectURL(blob);
  url.download = "todo-list.txt";
  url.click();
}
