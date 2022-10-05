import z from 'zod';
import { useState, useEffect } from "react";
import { AsyncData, Future, Result } from "@swan-io/boxed";

const baseUrl = 'nalka-on-pitka-api.fly.dev';

export type RequestResult<Schema extends z.ZodTypeAny> = Result<z.infer<Schema>, Error | z.ZodError>;

const request = <Schema extends z.ZodTypeAny>(path: string, schema: Schema): Future<RequestResult<Schema>> =>
  Future.make((resolve) => {
    const controller = new AbortController();

    fetch(`${baseUrl}${path}`, { signal: controller.signal })
      .then((res) => res.json())
      .then((json) => {
        const parsed = schema.safeParse(json);
        if (parsed.success) {
          return resolve(Result.Ok(parsed.data));
        }
        return resolve(Result.Error(parsed.error));
      })
      .catch((error) => resolve(Result.Error(error)));

    // Here, the implementation detail is managed in place
    return () => controller.abort();
  });

const useRequest = <Schema extends z.ZodTypeAny>(path: string, schema: Schema) => {
  // Initially, the request hasn't performed
  const [res, setRes] = useState(() => AsyncData.NotAsked<RequestResult<Schema>>());

  useEffect(() => {
    // Indicate that we started loading
    setRes(AsyncData.Loading());

    const req = request(path, schema);

    req.onResolve((res) => {
      setRes(AsyncData.Done(res))
    });

    return () => req.cancel();
  }, [path, schema]);

  // We can then match on the value, in a flat way
  return res;
};

export default useRequest;
