"use client";
import { User } from "@/src/generated/prisma/client";
import axios from "axios";
import { useEffect, useState } from "react";
import { create } from "zustand";

type UseUserStore = {
  accessToken: string;
  user: User | null;
  loading: boolean;
  setUser: (user: User | null) => void;
  setAccessToken: (accessToken: string) => void;
  setLoading: (loading: boolean) => void;
};
const useUserStore = create<UseUserStore>((set) => ({
  user: null,
  accessToken: "",
  loading: true,
  setUser: (user: User | null) => set(() => ({ user })),
  setAccessToken: (accessToken: string) => set(() => ({ accessToken })),
  setLoading: (loading: boolean) => set(() => ({ loading })),
}));

export const useUser = () => {
  const { user, accessToken, setAccessToken, loading } = useUserStore();

  return { user, accessToken, loading, setAccessToken };
};
export const UserProvider = () => {
  const { accessToken, setUser, setAccessToken, setLoading } = useUserStore();
  useEffect(() => {
    if (window) {
      setAccessToken(localStorage.getItem("accessToken") || "");
      setLoading(false);
    }
  }, []);
  useEffect(() => {
    if (accessToken) {
      axios
        .get("/api/auth/me", {
          headers: {
            Authorization: "Bearer " + accessToken,
          },
        })
        .then((res) => {
          setUser(res.data.user);
          setLoading(false);
          localStorage.setItem("accessToken", accessToken);
        })
        .catch(({ response }) => {
          localStorage.removeItem("accessToken");
          alert(response.data.message);
          setUser(null);
          setAccessToken("");
          setLoading(false);
        });
    }
  }, [accessToken]);
  return null;
};
