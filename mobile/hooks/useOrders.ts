import { useAuth } from "@clerk/clerk-expo";
import { useQuery } from "@tanstack/react-query";
import { useApi } from "@/lib/api";
import { Order } from "@/types";

export const useOrders = () => {
  const api = useApi();
  const { isLoaded, isSignedIn } = useAuth();

  return useQuery<Order[]>({
    queryKey: ["orders"],
    queryFn: async () => {
      const { data } = await api.get("/orders");
      return data.orders;
    },
    enabled: !!isLoaded && !!isSignedIn,
    retry: 2,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 5000),
  });
};
