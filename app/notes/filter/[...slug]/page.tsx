import { notFound } from 'next/navigation';
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from '@tanstack/react-query';
import { fetchNotes } from '@/lib/api';
import type { NoteFilterTag } from '@/types/note';
import NotesClient from '../../Notes.client';

const PER_PAGE = 12;

const allowedTags: NoteFilterTag[] = [
  'all',
  'Work',
  'Personal',
  'Meeting',
  'Shopping',
  'Todo',
];

type Props = {
  params: Promise<{
    slug: string[];
  }>;
};

export default async function FilteredNotesPage({ params }: Props) {
  const { slug } = await params;

  if (!slug || slug.length !== 1) {
    notFound();
  }

  const currentTag = slug[0] as NoteFilterTag;

  if (!allowedTags.includes(currentTag)) {
    notFound();
  }

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: [
      'notes',
      { page: 1, perPage: PER_PAGE, search: '', tag: currentTag },
    ],
    queryFn: () =>
      fetchNotes({
        page: 1,
        perPage: PER_PAGE,
        search: '',
        tag: currentTag,
      }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient initialTag={currentTag} />
    </HydrationBoundary>
  );
}
