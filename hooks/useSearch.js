import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchProducts = async (query, isAi) => {
  if (!query) return [];
  
  // Your backend URL
  const { data } = await axios.get("http://localhost:5000/api/search", {
    params: { 
      query, 
      mode: isAi ? "ai" : "regular" 
    },
  });
  return data;
};

export function useSearch(query, isAi) {
  return useQuery({
    queryKey: ["products", query, isAi],
    queryFn: () => fetchProducts(query, isAi),
    enabled: query.length > 2, // Don't search until user types 3+ letters
    staleTime: 1000 * 60 * 5, // Cache results for 5 minutes
  });
}