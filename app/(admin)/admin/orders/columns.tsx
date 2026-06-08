// app/admin/orders/columns.tsx
"use client";

import { ColumnDef } from "@tanstack/react-table";
import { FoodOrderWithUser } from "./page";
import { Checkbox } from "@/components/ui/checkbox";

export const columns: ColumnDef<FoodOrderWithUser>[] = [
  {
    id: "select",
    // Хүснэгтийн толгой дээрх Checkbox (Бүгдийг зэрэг сонгох үүрэгтэй)
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
    // Мөр болгоны хажууд гарах Checkbox (Тухайн мөрийг сонгох үүрэгтэй)
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

    // 1, 2, 3 гэж дарааллын дугаар харуулна
    cell: ({ row }) => row.index + 1,
  },
  {
    // Хэрэглэгчийн имэйл
    accessorKey: "user.email",
    header: "Customer",
  },
  {
    id: "foods_count",
    header: "Food",
    // Энд түрүүндээ зүгээр текст харуулъя, дараа нь унадаг цэс болгож болно
    cell: () => "2 foods 🔽",
  },
  {
    accessorKey: "createdAt",
    header: "Date",
    cell: ({ row }) => {
      const date = new Date(row.getValue("createdAt"));
      return date.toLocaleDateString(); // "2024/12/20" болгоно
    },
  },
  {
    accessorKey: "totalPrice",
    header: "Total",
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("totalPrice"));
      return `$${amount.toFixed(2)}`; // "$26.97" болгоно
    },
  },
  {
    id: "address",
    header: "Delivery Address",
    cell: () => "Сүхбаатар дүүрэг, 12-р хороо...", // Түр хаяг харуулах хэсэг
  },
  {
    accessorKey: "status",
    header: "Delivery state",
    cell: ({ row }) => {
      const status = row.getValue("status") as string;
      // Төлөвөөс хамаарч өнгө өнгийн Badge харуулна
      return (
        <span
          className={`px-2 py-1 rounded-full text-xs font-semibold ${
            status === "PENDING"
              ? "bg-red-100 text-red-600 border border-red-300"
              : status === "DELIVERED"
                ? "bg-green-100 text-green-600 border border-green-300"
                : "bg-gray-100 text-gray-600"
          }`}
        >
          {status}
        </span>
      );
    },
  },
];
