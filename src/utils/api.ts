import { TCat } from "../types/types";

const API_ORIGIN = process.env.API_ORIGIN

export const getCat = async (): Promise<TCat[]> => {
  const response = await fetch(API_ORIGIN);
  if(!response.ok) {
    const error = await response.json();
    throw error;
  }
  return response.json();
} 