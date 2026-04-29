import { HydrationBoundary, dehydrate } from '@tanstack/react-query';
import { fetchNotes } from '../../lib/api/serverApi';
import { makeQueryClient } from '../../lib/queryClient';
import NotesClient from './Notes.client';

interface NotesPageProps {
  searchParams: Promise<{
    page?: string;
    search?: string;
  }>;
}

export default async function NotesPage({ searchParams }: NotesPageProps) {
  const resolvedSearchParams = await searchParams;

  const page = Number(resolvedSearchParams.page) || 1;
  const search = resolvedSearchParams.search || '';

  const queryClient = makeQueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['notes', page, search],
    queryFn: () =>
      fetchNotes({
        page,
        perPage: 12,
        search,
      }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient initialPage={page} initialSearch={search} />
    </HydrationBoundary>
  );
}