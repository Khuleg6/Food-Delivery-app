"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { Plus, Pencil, Trash2, Check, X } from "lucide-react";
import { useState } from "react";

type Category = {
  id: string;
  categoryName: string;
};

export const CategoryManageDialog = ({
  open,
  onClose,
  categories,
  refreshData,
}: {
  open: boolean;
  onClose: () => void;
  categories: Category[];
  refreshData: () => void;
}) => {
  const [newCatName, setNewCatName] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingName, setEditingName] = useState("");
  const [loading, setLoading] = useState(false);

  // 1. ШИНЭЭР НЭМЭХ
  const handleCreate = () => {
    if (!newCatName.trim()) return;
    setLoading(true);
    axios
      .post("/api/foods/categories", { categoryName: newCatName })
      .then(() => {
        alert("Категори амжилттай нэмэгдлээ! 🎉");
        setNewCatName("");
        refreshData();
        window.location.reload();
      })
      .catch(() => alert("Нэмэхэд алдаа гарлаа"))
      .finally(() => setLoading(false));
  };

  // 2. ЗАСАЖ ЭХЛЭХ
  const startEdit = (id: string, currentName: string) => {
    setEditingId(id);
    setEditingName(currentName);
  };

  // 3. ЗАССАНЫГ ХАДГАЛАХ
  const handleUpdate = (id: string) => {
    if (!editingName.trim()) return;
    setLoading(true);
    axios
      .put("/api/foods/categories", { id, categoryName: editingName })
      .then(() => {
        setEditingId(null);
        refreshData();
        window.location.reload();
      })
      .catch(() => alert("Засахад алдаа гарлаа"))
      .finally(() => setLoading(false));
  };

  // 4. УСТГАХ
  const handleDelete = (id: string) => {
    if (!confirm("Энэ категорийг устгахдаа итгэлтэй байна уу?")) return;
    setLoading(true);
    axios
      .delete("/api/foods/categories", { data: { id } })
      .then(() => {
        refreshData();
        window.location.reload();
      })
      .catch(() =>
        alert("Устгахад алдаа гарлаа. Хоол холбоотой байж магадгүй."),
      )
      .finally(() => setLoading(false));
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md p-6">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">
            Manage Categories
          </DialogTitle>
        </DialogHeader>

        {/* ШИНЭЭР НЭМЭХ ХЭСЭГ */}
        <div className="flex gap-2 my-2">
          <Input
            placeholder="New category name..."
            value={newCatName}
            onChange={(e) => setNewCatName(e.target.value)}
            disabled={loading}
          />
          <Button
            onClick={handleCreate}
            disabled={loading}
            size="icon"
            className="bg-red-500 hover:bg-red-600 shrink-0"
          >
            <Plus className="size-4" />
          </Button>
        </div>

        <hr className="my-2" />

        {/* КАТЕГОРИУДЫН ЖАГСААЛТ */}
        <div className="flex flex-col gap-2 max-h-[300px] overflow-y-auto pr-1">
          {categories.map((cat) => (
            <div
              key={cat.id}
              className="flex items-center justify-between p-2 rounded-lg border border-zinc-100 bg-zinc-50/50 gap-2"
            >
              {/* ЗАСАЖ БАЙГАА ҮЕИЙН INPUT */}
              {editingId === cat.id ? (
                <Input
                  value={editingName}
                  onChange={(e) => setEditingName(e.target.value)}
                  className="h-8 py-1"
                  disabled={loading}
                />
              ) : (
                <span className="text-sm font-medium px-2">
                  {cat.categoryName}
                </span>
              )}

              {/* ҮЙЛДЛИЙН ТОВЧНУУД */}
              <div className="flex items-center gap-1 shrink-0">
                {editingId === cat.id ? (
                  <>
                    <Button
                      onClick={() => handleUpdate(cat.id)}
                      disabled={loading}
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-green-600 hover:text-green-700"
                    >
                      <Check className="size-4" />
                    </Button>
                    <Button
                      onClick={() => setEditingId(null)}
                      disabled={loading}
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-zinc-400"
                    >
                      <X className="size-4" />
                    </Button>
                  </>
                ) : (
                  <>
                    <Button
                      onClick={() => startEdit(cat.id, cat.categoryName)}
                      disabled={loading}
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-zinc-500 hover:text-amber-500"
                    >
                      <Pencil className="size-3.5" />
                    </Button>
                    <Button
                      onClick={() => handleDelete(cat.id)}
                      disabled={loading}
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-zinc-500 hover:text-red-500"
                    >
                      <Trash2 className="size-3.5" />
                    </Button>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};
