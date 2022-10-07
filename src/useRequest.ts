import z from 'zod';
import { useQuery } from "react-query";

const baseUrl = 'https://nalka-on-pitka-api.fly.dev';

const useRequest = <Schema extends z.ZodTypeAny>(id: string, path: string, schema: Schema) => {
  return useQuery<z.infer<Schema>>(id, ({ signal }) => {
    return fetch(`${baseUrl}${path}`, { signal })
        .then((res) => res.json())
        .then((json) => schema.parse(json));
  });
};

export default useRequest;
