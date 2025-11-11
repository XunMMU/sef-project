import { createFileRoute } from "@tanstack/react-router"
import { useQuery } from "@tanstack/react-query"
import { treaty } from '@elysiajs/eden'

import type { App } from '@/server/index'

export const Route = createFileRoute('/html/testing/')({
  component: Testapp,
})


function Testapp() {
  const { isPending, error, data, isFetching } = useQuery({
    queryKey: ['testing'],
    queryFn: async () => {
      const app = treaty<App>('localhost:3000')
      const { data, error } = await app.api.get()
      if (error)
        throw new Error(`${error}`);
      return data;
    }
  })

  if (isPending) return 'Loading';

  if (error) return `${error}`;

  return data;
}
