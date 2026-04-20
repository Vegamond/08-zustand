import type { Metadata } from 'next';
import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query';
import { fetchNotes } from '@/lib/api';
import NotesClient from './Notes.client';

const PER_PAGE = 12;

interface Props {
  params: Promise<{ slug: string[] }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const tag = slug?.[0] === 'all' ? 'All' : slug?.[0] ?? 'All';

  return {
    title: `${tag} notes | NoteHub`,
    description: `Browse your ${tag === 'All' ? 'all' : tag} notes on NoteHub.`,
    openGraph: {
      title: `${tag} notes | NoteHub`,
      description: `Browse your ${tag === 'All' ? 'all' : tag} notes on NoteHub.`,
      url: `https://08-zustand.vercel.app/notes/filter/${slug?.[0] ?? 'all'}`,
      images: [
        {
          url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
        },
      ],
    },
  };
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