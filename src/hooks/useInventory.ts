import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api/client";
import { queryKeys } from "@/lib/api/query-keys";

export function useInventory(groupId?: string) {
  return useQuery({
    queryKey: queryKeys.inventory(groupId ?? "none"),
    enabled: Boolean(groupId),
    retry: false,
    queryFn: async () => {
      const response = await api.getInventory(groupId!);
      return response.items;
    },
  });
}
