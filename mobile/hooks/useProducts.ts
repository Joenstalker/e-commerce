import { useAuth } from "@clerk/clerk-expo";
import { useApi } from "@/lib/api";
import { Product } from "@/types";
import { useQuery } from "@tanstack/react-query";

const useProducts = () => {
  const api = useApi();
  const { isLoaded, isSignedIn } = useAuth();

  const result = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const { data } = await api.get<Product[]>("/products");
      return data;
    },
    enabled: !!isLoaded && !!isSignedIn,
    retry: 2,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 5000),
  });

  return result;
};

export default useProducts;
