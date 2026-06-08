// app/admin/orders/page.tsx
"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { Prisma } from "@/src/generated/prisma/client";
import { columns } from "./columns";
import { DataTable } from "./data-table";

export type FoodOrderWithUser = Prisma.FoodOrderGetPayload<{
  include: { user: true };
}>;

export default function AdminOrderPage() {
  const [orders, setOrders] = useState<FoodOrderWithUser[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("/api/orders") // Өөрийн захиалга авдаг зөв API хаягаа тавиарай
      .then((res) => {
        setOrders(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading)
    return (
      <div className="p-10 text-center text-sm text-zinc-500">
        Ачаалж байна...
      </div>
    );

  return (
    <div className="p-6 max-w-7xl mx-auto flex flex-col gap-4">
      <div>
        <h1 className="text-2xl font-bold text-zinc-900">Orders</h1>
        <p className="text-sm text-zinc-500">{orders.length} items</p>
      </div>

      {/* Дата хүснэгтээ энд зуруулна */}
      <DataTable columns={columns} data={orders} />
    </div>
  );
}
