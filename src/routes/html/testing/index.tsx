import { treaty } from "@elysiajs/eden";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

import type { App } from "@/server/index";

export const Route = createFileRoute("/html/testing/")({
  component: Testapp,
});

function Testapp() {
  const { isPending, error, data, isFetching } = useQuery({
    queryKey: ["testing"],
    queryFn: async () => {
      const app = treaty<App>("localhost:3000"); // fix this export as global object
      const { data, error } = await app.api.get();
      if (error) throw new Error(`${error}`);
      return data;
    },
  });

  if (isFetching) return "Fetching";

  if (isPending) return "Loading";

  if (error) return `${error}`;

  return data;
}
