import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "./client";

export interface Submission {
  id: string;
  createdAt: string;
  data: Record<string, any>;
}

interface SubmissionsResponse {
  success: boolean;
  items: Submission[];
  total: number;
  totalPages: number;
  page: number;
  limit: number;
}

export const useSubmissionsQuery = (
  page: number,
  limit: number,
  sortOrder: "asc" | "desc",
) =>
  useQuery<SubmissionsResponse>({
    queryKey: ["submissions", { page, limit, sortOrder }],
    queryFn: async () => {
      const res = await api.get("/submissions", {
        params: { page, limit, sortBy: "createdAt", sortOrder },
      });
      return res.data;
    },
    // keepPreviousData: true,
  });

export const useCreateSubmissionMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: Record<string, any>) => {
      const res = await api.post("/submissions", payload);
      return res.data;
    },
    onSuccess: () => {
      // invalidate so table reloads
      queryClient.invalidateQueries({ queryKey: ["submissions"] });
    },
  });
};
