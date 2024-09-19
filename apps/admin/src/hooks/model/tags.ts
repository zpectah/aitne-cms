import { useQuery } from '@tanstack/react-query';

export const useTagsQuery = () => {
  const query = useQuery({
    queryKey: ['tags-list'],
    queryFn: () => fetch(`${process.env.API_BASE}/api/private/tags`).then((res) => res.json()),
  });

  return {
    query,
  };
};

export const useTagsDetailQuery = (id: number | undefined) => {
  const query = useQuery({
    queryKey: [`tags-detail-${id}`],
    queryFn: () => fetch(`${process.env.API_BASE}/api/private/tags/${id}`).then((res) => res.json()),
    enabled: !!id,
  });

  return {
    query,
  };
};
