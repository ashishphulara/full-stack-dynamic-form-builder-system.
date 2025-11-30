import { useQuery } from "@tanstack/react-query";
import { api } from "./client";

type FormSchema = Record<string, any>;
// type FormField = Record<string, any>;

export const useFormSchemaQuery = () =>
  useQuery<FormSchema>({
    queryKey: ["formSchema"],
    queryFn: async () => {
      const res = await api.get("/form-schema");
      return res.data;
    },
  });
