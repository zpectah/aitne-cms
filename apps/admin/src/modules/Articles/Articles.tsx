import { useQuery } from '@tanstack/react-query';

import { ViewLayout, PageLayoutPreloader } from '../../components';

const Articles = () => {
  const { isLoading, error, data } = useQuery({
    queryKey: ['repoData'],
    queryFn: () => fetch('https://api.github.com/repos/zpectah/aitne-cms').then((res) => res.json()),
  });

  if (isLoading) return <PageLayoutPreloader />;

  if (error) return `An error has occurred: ${error.message}`;

  return (
    <ViewLayout meta={{ title: 'Articles' }} title="Articles">
      ...Articles...
      <div>
        <div>
          <span>isLoading: {isLoading ? 'y' : 'n'}</span>
        </div>
        <h1>{data.name}</h1>
        <p>{data.description}</p>
        <strong>👀 {data.subscribers_count}</strong> <strong>✨ {data.stargazers_count}</strong>{' '}
        <strong>🍴 {data.forks_count}</strong>
      </div>
    </ViewLayout>
  );
};

export default Articles;
