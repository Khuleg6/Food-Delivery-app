"use client";

import { ColumnDef } from "@tanstack/react-table";
import { FoodOrderWithUser } from "./page";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";

// 💡 Төлөв өөрчлөх функцийг Page-ээс хүлээж авах туслах функц
export const createColumns = (
  onStatusUpdate: (orderId: string, newStatus: string) => void,
): ColumnDef<FoodOrderWithUser>[] => [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    id: "number",
    header: "№",
    cell: ({ row }) => row.index + 1,
  },
  {
    // Хэрэглэгчийн имэйл
    accessorKey: "user.email",
    header: "Customer",
    cell: ({ row }) => row.original.user?.email || "Зочин",
  },
  {
    id: "foods_count",
    header: "Food",
    cell: ({ row }) => {
      const items = (row.original as any).items || [];
      return (
        <div className="space-y-1 max-w-[200px]">
          {items.map((item: any) => (
            <div key={item.id} className="text-xs text-zinc-700">
              🍔 {item.foodName || item.food?.name}{" "}
              <span className="text-zinc-400 font-bold">x{item.quantity}</span>
            </div>
          ))}
          {items.length === 0 && (
            <span className="text-zinc-400 text-xs">Хоол байхгүй</span>
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: "Date",
    cell: ({ row }) => {
      const date = new Date(row.getValue("createdAt"));
      return date.toLocaleDateString("mn-MN");
    },
  },
  {
    accessorKey: "totalPrice",
    header: "Total",
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("totalPrice"));
      return (
        <span className="font-bold text-zinc-900">
          {amount.toLocaleString()} ₮
        </span>
      );
    },
  },
  {
    id: "address",
    header: "Delivery Address",
    cell: ({ row }) =>
      (row.original as any).address || "Сүхбаатар дүүрэг, 12-р хороо...",
  },
  {
    accessorKey: "status",
    header: "Delivery state",
    cell: ({ row }) => {
      const status = row.getValue("status") as string;
      return (
        <span
          className={`px-2.5 py-1 rounded-full text-xs font-bold inline-block border
            ${status === "PENDING" ? "bg-amber-50 text-amber-600 border-amber-200" : ""}
            ${status === "DELIVERED" ? "bg-green-50 text-green-600 border-green-200" : ""}
            ${status === "CANCELED" ? "bg-red-50 text-red-600 border-red-200" : ""}
          `}
        >
          {status}
        </span>
      );
    },
  },
  {
    id: "actions",
    header: () => <div className="text-right mr-4">Үйлдэл</div>,
    cell: ({ row }) => {
      const order = row.original;
      const status = order.status;

      // 💡 Хэрэв захиалга PENDING (Хүлээгдэж буй) байвал л админд товчлуурууд харагдана
      if (status === "PENDING") {
        return (
          <div className="flex justify-end gap-2 pr-2">
            <Button
              size="sm"
              className="bg-emerald-600 text-white hover:bg-emerald-700 text-xs h-8"
              onClick={() => onStatusUpdate(order.id, "DELIVERED")}
            >
              Хүргэгдсэн
            </Button>
            <Button
              size="sm"
              variant="ghost"
              className="text-red-500 hover:text-red-600 hover:bg-red-50 text-xs h-8"
              onClick={() => onStatusUpdate(order.id, "CANCELED")}
            >
              Цуцлах
            </Button>
          </div>
        );
      }

      // 💡 Хэрэв аль хэдийн DELIVERED эсвэл CANCELED болчихсон бол ямар нэгэн товчлуур харуулахгүй, түүх болоод үлдэнэ
      return (
        <div className="text-right mr-4 text-xs text-zinc-400 italic">
          Шийдвэрлэгдсэн
        </div>
      );
    },
  },
];
