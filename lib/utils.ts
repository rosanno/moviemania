import axios from "axios";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const API = axios.create({
  baseURL: process.env.NEXT_PUBLIC_TMDB_BASE_URL,
  params: {
    api_key: process.env.NEXT_PUBLIC_TMDB_API_KEY,
  },
});

export const convertRuntime = (amount: number | undefined) => {
  if (!amount) return "Unknown";
  if (amount < 60) {
    return `0h ${amount}m`;
  }
  if (amount < 120) {
    return `1h ${amount - 60}m`;
  }
  if (amount < 180) {
    return `2h ${amount - 120}m`;
  }
  return `3h ${amount - 180}m`;
};
