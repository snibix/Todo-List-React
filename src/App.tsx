import { Label } from "@radix-ui/react-label";
import { CirclePlus } from "lucide-react";
import { useState } from "react";
import "./App.css";
import TodoContainer from "./components/TodoList";
import { Button } from "./components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./components/ui/dialog";
import { Input } from "./components/ui/input";

type Todo = {
  id: number;
  title: string;
  description: string;
  status: boolean;
};
function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleAdd = (title: string, description: string) => {
    const newTodo = {
      id: Date.now(),
      title,
      description,
      status: false,
    };
    setTodos([newTodo, ...todos]);
  };
  return (
    <div className="w-full flex items-center flex-col">
      <h1 className="text-white text-6xl p-4">TodoList</h1>
      <div className="w-[1200px] flex justify-end">
        <Dialog>
          <DialogTrigger>
            <CirclePlus className="text-white cursor-pointer" />
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Todo</DialogTitle>

              <Label className="pt-4">Titre</Label>
              <Input value={title} onChange={(e) => setTitle(e.target.value)} />

              <Label className="pt-4">Description</Label>
              <Input
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />

              <Button
                className="py-5 mt-5 w-50 mx-auto"
                onClick={() => {
                  if (title && description) {
                    handleAdd(title, description);
                    setTitle("");
                    setDescription("");
                  }
                }}
              >
                Ajouter
              </Button>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>
      <div className="">
        <TodoContainer todos={todos} setTodos={setTodos} />
      </div>
    </div>
  );
}

export default App;
