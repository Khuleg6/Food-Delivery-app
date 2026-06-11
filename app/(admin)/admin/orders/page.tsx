// app/admin/orders/page.tsx
"use client";
import * as React from "react";
import { addDays, format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { type DateRange } from "react-day-picker";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Field, FieldLabel } from "@/components/ui/field";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useEffect, useState } from "react";
import axios from "axios";
import { Prisma } from "@/src/generated/prisma/client";
import { createColumns } from "./columns"; // 🌟 ЗАСВАР: Зүгээр columns биш, createColumns функцийг дуудна
import { DataTable } from "./data-table";

export type FoodOrderWithUser = Prisma.FoodOrderGetPayload<{
  include: { user: true };
}>;

export default function AdminOrderPage() {
  const [orders, setOrders] = useState<FoodOrderWithUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: new Date(), // Өнөөдөр
    to: addDays(new Date(), 20), // Өнөөдрөөс хойш 20 хоног
  });

  // 1. Бэкэндээс датагаа татах функц
  const fetchOrders = () => {
    axios
      .get("/api/orders")
      .then((res) => {
        setOrders(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // 🌟 ЖИНХЭНЭ ЛОГИК: Админ товчлуур дарах үед бэкэнд рүү статус явуулж, дэлгэцийг шинэчлэх гар
  const handleStatusUpdate = async (orderId: string, newStatus: string) => {
    try {
      // Бэкэнд рүү "Энэ ID-тай захиалгыг DELIVERED эсвэл CANCELED болгоорой" гэж илгээнэ
      await axios.put(`/api/orders/${orderId}`, { status: newStatus });

      // Амжилттай болбол, дэлгэц дээрх датагаа хуудас уншуулахгүйгээр шууд сольчихно
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order.id === orderId ? { ...order, status: newStatus as any } : order,
        ),
      );
    } catch (error) {
      console.error("Статус өөрчлөхөд алдаа гарлаа:", error);
      alert("Алдаа гарлаа. Бэкэнд кодоо шалгана уу.");
    }
  };

  // 🌟 ЗАСВАР: Түрүүний бэлдсэн баганууд руугаа "Төлөв өөрчлөх функц"-ээ шиднэ
  const columns = createColumns(handleStatusUpdate);

  if (loading)
    return (
      <div className="p-10 text-center text-sm text-zinc-500">
        Ачаалж байна...
      </div>
    );
  const filteredOrders = orders.filter((order) => {
    // Хэрэв календарь дээр огноо сонгоогүй байвал БҮХ захиалгыг харуулна
    if (!date?.from) return true;

    const orderDate = new Date(order.createdAt);
    const fromDate = new Date(date.from);
    // 'to' огноог сонгоогүй байвал 'from' огноотой ижил гэж үзнэ
    const toDate = date.to ? new Date(date.to) : new Date(date.from);

    // Хайлтыг илүү нарийвчлалтай болгохын тулд цагийг нь 00:00 болон 23:59 болгож тааруулна
    fromDate.setHours(0, 0, 0, 0);
    toDate.setHours(23, 59, 59, 999);

    return orderDate >= fromDate && orderDate <= toDate;
  });

  if (loading)
    return (
      <div className="p-10 text-center text-sm text-zinc-500">
        Ачаалж байна...
      </div>
    );

  return (
    <div className="p-6 max-w-7xl mx-auto flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-zinc-900">Orders</h1>
          <p className="text-sm text-zinc-500">{filteredOrders.length} items</p>
        </div>

        <Field className="ml-auto w-60">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                id="date-picker-range"
                className="justify-start px-2.5 font-normal"
              >
                <CalendarIcon />
                {date?.from ? (
                  date.to ? (
                    <>
                      {format(date.from, "LLL dd, y")} -{" "}
                      {format(date.to, "LLL dd, y")}
                    </>
                  ) : (
                    format(date.from, "LLL dd, y")
                  )
                ) : (
                  <span>Pick a date</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="range"
                defaultMonth={date?.from}
                selected={date}
                onSelect={setDate}
                numberOfMonths={2}
              />
            </PopoverContent>
          </Popover>
        </Field>
      </div>

      {/* Дата хүснэгтээ энд зуруулна */}
      <DataTable columns={columns} data={filteredOrders} />
    </div>
  );
}
