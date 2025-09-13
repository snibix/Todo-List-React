import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Pencil, Trash } from "lucide-react";
import { useState } from "react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import {
  Card,
  CardAction,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Checkbox } from "./ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

interface PropsTodo {
  todo: {
    title: string;
    description: string;
    id: number;
    status: boolean;
  };
  onUpdate: (
    id: number,
    title: string,
    description: string,
    status: boolean
  ) => void;
  onDelete: (id: number) => void;
}

export default function Todo({ todo, onUpdate, onDelete }: PropsTodo) {
  const [newTitle, setNewTitle] = useState(todo.title);
  const [newDescription, setNewDescription] = useState(todo.description);
  const [newStatus, setNewStatus] = useState(todo.status);
  const handleSave = () => {
    onUpdate(todo.id, newTitle, newDescription, newStatus);
  };

  return (
    <div className="pt-5">
      <Card className="w-75 h-60 flex flex-col justify-between">
        <CardHeader className="flex justify-between">
          <CardTitle className="text-xl">{todo.title}</CardTitle>
          {todo.status === false ? (
            <div className="flex flex-col items-center">
              <Badge variant="secondary" className="bg-red-800 text-white">
                En cours
              </Badge>
            </div>
          ) : (
            <div className="flex flex-col items-center">
              <Badge variant="secondary" className="bg-blue-500 text-white">
                Terminés
              </Badge>
            </div>
          )}
        </CardHeader>

        <CardDescription className="p-4">{todo.description}</CardDescription>
        <CardAction className="flex justify-between w-full px-5">
          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-blue-700">
                <Pencil className="cursor-pointer hover:text-blue-500" />
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Todo {todo.id}</DialogTitle>
              </DialogHeader>

              <div>
                <Label className="pt-4">Nouveau Titre</Label>
                <Input
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                />
              </div>

              <div>
                <Label className="pt-4">Nouvelle Description</Label>
                <Input
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                />
              </div>

              <div>
                <Label className="pt-4 pb-2">
                  {newStatus ? "Terminés" : "En cours"}
                </Label>
                <Checkbox
                  checked={newStatus}
                  onCheckedChange={(checked) => {
                    if (typeof checked === "boolean") {
                      setNewStatus(checked);
                    }
                  }}
                />
              </div>

              <Button className="py-5 mt-5 w-50 mx-auto" onClick={handleSave}>
                Enregistré
              </Button>
            </DialogContent>
          </Dialog>

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button className="cursor-pointer bg-red-600 p-5 hover:bg-red-700">
                <Trash className="text-white" />
              </Button>
            </AlertDialogTrigger>

            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>
                  Voulez-vous supprimer cette tâches?
                </AlertDialogTitle>
              </AlertDialogHeader>

              <AlertDialogFooter>
                <AlertDialogCancel>Non</AlertDialogCancel>
                <AlertDialogAction
                  onClick={() => {
                    onDelete(todo.id);
                  }}
                  className="bg-red-600 hover:bg-red-800"
                >
                  Oui
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </CardAction>
      </Card>
    </div>
  );
}
