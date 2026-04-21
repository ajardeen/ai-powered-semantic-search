import { useQuery } from "@tanstack/react-query";
import axios from "axios";
const URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:3000";

const endPoint = "/api/search";
const fetchProducts = async (query: string, isAi: boolean) => {
  if (!query) return [];

  // Your backend URL
  const { data } = await axios.get(`${URL}${endPoint}`, {
    params: {
      query,
      mode: isAi ? "ai" : "regular",
    },
  });
  return data;
};

export function useSearch(query: string, isAi: boolean) {
  return useQuery({
    queryKey: ["products", query, isAi],
    queryFn: () => fetchProducts(query, isAi),
    enabled: query.length > 2, // Don't search until user types 3+ letters
    staleTime: 1000 * 60 * 5, // Cache results for 5 minutes
  });
}
