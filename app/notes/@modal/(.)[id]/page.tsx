import { HydrationBoundary, dehydrate } from '@tanstack/react-query';
import { fetchNoteById } from '../../../../lib/api/serverApi';
import { makeQueryClient } from '../../../../lib/queryClient';
import NotePreview from '../../../../components/NotePreview/NotePreview';

interface NoteModalPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function NoteModalPage({ params }: NoteModalPageProps) {
  const { id } = await params;
  const queryClient = makeQueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['note', id],
    queryFn: () => fetchNoteById(id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotePreview />
    </HydrationBoundary>
  );
}