import Todo from "./Todo";

type Todo = {
  id: number;
  title: string;
  description: string;
  status: boolean;
};

interface Props {
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

export default function ContainerTodo({ todos, setTodos }: Props) {
  const handleUpdate = (
    id: number,
    title: string,
    description: string,
    status: boolean
  ) => {
    const updateTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, title, description, status } : todo
    );
    setTodos(updateTodos);
  };

  const handleDelete = (id: number) => {
    const updateTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updateTodos);
  };
  return (
    <div className="flex gap-4 flex-wrap w-[1250px]">
      {todos.length === 0 ? (
        <h2 className="text-white text-4xl mx-auto mt-50">
          Aucune tâche pour le moment 💤
        </h2>
      ) : (
        todos.map((todo) => (
          <Todo
            key={todo.id}
            todo={todo}
            onUpdate={handleUpdate}
            onDelete={handleDelete}
          />
        ))
      )}
    </div>
  );
}
