"use client";

import { ColumnDef } from "@tanstack/react-table";
import { FoodOrderWithUser } from "./page";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
// 🌟 ШИНЭ ИМПОРТ: Хүснэгтийн хүрээнээс гаргах шидэт Popover
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

// 🍔 ХОЛНЫ БАГАНЫГ ТУСАД НЬ КОМПОНЕНТ БОЛГОХ НЬ (Radix Popover ашиглав)
const FoodOrderCell = ({ order }: { order: any }) => {
  const foodItems = order.foodOrderItems || [];

  const totalItemsCount = foodItems.reduce(
    (sum: number, item: any) => sum + item.quantity,
    0,
  );

  if (foodItems.length === 0) {
    return <span className="text-zinc-400 italic text-xs">No items</span>;
  }

  return (
    // 🌟 Портал ашигладаг тул z-index-ийн ямар ч алдаа гарахгүй!
    <Popover>
      {/* 🔘 Дардаг товчлуур */}
      <PopoverTrigger asChild>
        <button className="flex items-center gap-2 text-zinc-700 hover:text-black font-semibold border border-zinc-200 px-3 py-1.5 rounded-xl bg-white shadow-sm transition-all text-xs outline-none">
          <span>{totalItemsCount} foods</span>
          <ChevronDown className="w-3.5 h-3.5 text-zinc-400" />
        </button>
      </PopoverTrigger>

      {/* 🌟 2 ДУГААР ЗУРАГ ШИГ ГОЁ УНАЖ ИРДЭГ ЦОНХ */}
      {/* align="start" нь товчлуурын зүүн талтай яг тааруулж унагаана */}
      <PopoverContent
        align="start"
        className="w-[300px] bg-white rounded-2xl shadow-xl border border-zinc-100 p-4 flex flex-col gap-3 z-[100]"
      >
        <p className="text-[11px] font-bold text-zinc-400 border-b border-zinc-100 pb-1.5 uppercase tracking-wider">
          Order Items
        </p>

        <div className="flex flex-col gap-3 max-h-[250px] overflow-y-auto pr-1">
          {foodItems.map((item: any) => (
            <div
              key={item.id}
              className="flex items-center justify-between gap-4 border-b border-zinc-50 pb-2 last:border-0 last:pb-0"
            >
              <div className="flex items-center gap-3">
                {/* Хоолны зураг */}
                <img
                  src={item.food?.image || "/no-image.png"}
                  alt={item.food?.foodName}
                  className="w-10 h-10 object-cover rounded-xl border border-zinc-100 shadow-sm shrink-0"
                />
                <div className="flex flex-col min-w-0">
                  {/* Хоолны нэр */}
                  <span className="font-bold text-sm text-zinc-800 truncate max-w-[145px]">
                    {item.food?.foodName || "Устгагдсан хоол"}
                  </span>
                  {/* Үнэ */}
                  <span className="text-xs text-zinc-400">
                    {item.food?.price
                      ? `${item.food.price.toLocaleString()} ₮`
                      : "0 ₮"}
                  </span>
                </div>
              </div>

              {/* Тоо ширхэг */}
              <span className="text-xs font-extrabold bg-zinc-50 px-2 py-1 rounded-lg text-zinc-600 whitespace-nowrap">
                x {item.quantity}
              </span>
            </div>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
};

// 💡 Төлөв өөрчлөх функцийг Page-ээс хүлээж авах үндсэн функц
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
    accessorKey: "user.email",
    header: "Customer",
    cell: ({ row }) => row.original.user?.email || "Зочин",
  },
  {
    id: "foods_count",
    header: "Food",
    cell: ({ row }) => <FoodOrderCell order={row.original} />,
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
    cell: ({ row }) => {
      const order = row.original;
      return (order as any).address || order.user?.address || "Хаяг оруулаагүй";
    },
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

      if (status === "PENDING") {
        return (
          <div className="flex justify-end gap-2 pr-2">
            <Button
              size="sm"
              className="bg-emerald-600 text-white hover:bg-emerald-700 text-xs h-8 rounded-lg"
              onClick={() => onStatusUpdate(order.id, "DELIVERED")}
            >
              Хүргэгдсэн
            </Button>
            <Button
              size="sm"
              variant="ghost"
              className="text-red-500 hover:text-red-600 hover:bg-red-50 text-xs h-8 rounded-lg"
              onClick={() => onStatusUpdate(order.id, "CANCELED")}
            >
              Цуцлах
            </Button>
          </div>
        );
      }

      return (
        <div className="text-right mr-4 text-xs text-zinc-400 font-medium italic">
          Дууссан
        </div>
      );
    },
  },
];
