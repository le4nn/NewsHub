import { env } from '../../config/env';

export type Article = {
  title: string;
  url: string;
  description?: string | null;
  source?: { name?: string };
  publishedAt?: string;
};

type TopHeadlinesResponse = {
  status: string;
  totalResults?: number;
  articles?: Article[];
  message?: string;
};

export async function fetchTopHeadlines(): Promise<Article[]> {
  const apiKey = env.news.apiKey;
  const country = env.news.country;

  if (!apiKey) {
    throw new Error('Не задан EXPO_PUBLIC_NEWSAPI_KEY');
  }

  const url = `https://newsapi.org/v2/top-headlines?country=${country}&pageSize=30&apiKey=${apiKey}`;
  const res = await fetch(url);
  const data = (await res.json()) as TopHeadlinesResponse;

  if (!res.ok) {
    throw new Error(data?.message ?? 'Не удалось загрузить новости');
  }

  return (data?.articles ?? []) as Article[];
}
