import { useQuery } from "@tanstack/react-query";
import { api } from "./client";

export interface FormField {
  /* mirror backend types */
}
export interface FormSchema {
  /* mirror backend types */
}

export const useFormSchemaQuery = () =>
  useQuery<FormSchema>({
    queryKey: ["formSchema"],
    queryFn: async () => {
      const res = await api.get("/form-schema");
      return res.data;
    },
  });
