import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query';
import { fetchNotes } from '@/lib/api';
import NotesClient from './Notes.client';

const PER_PAGE = 12;

interface Props {
  params: Promise<{ slug: string[] }>;
}

export default async function FilteredNotesPage({ params }: Props) {
  const { slug } = await params;
  const tag = slug?.[0] === 'all' ? undefined : slug?.[0];
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ['notes', { page: 1, perPage: PER_PAGE, search: '', tag: tag ?? 'all' }],
    queryFn: () => fetchNotes({ page: 1, perPage: PER_PAGE, search: '', tag: tag ?? 'all' }),
  });
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient initialTag={tag ?? 'all'} />
    </HydrationBoundary>
  );
}

