'use client';

import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useDebounce } from 'use-debounce';
import { fetchNotes } from '@/lib/api';
import SearchBox from '@/components/SearchBox/SearchBox';
import NoteList from '@/components/NoteList/NoteList';
import NoteForm from '@/components/NoteForm/NoteForm';
import Pagination from '@/components/Pagination/Pagination';
import Modal from '@/components/Modal/Modal';

const PER_PAGE = 12;

interface NotesClientProps {
  initialTag?: string;
}

export default function NotesClient({ initialTag = 'all' }: NotesClientProps) {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [debouncedSearch] = useDebounce(search, 500);

  useEffect(() => {
    setPage(1);
    setSearch('');
  }, [initialTag]);

  const { data, isLoading, error } = useQuery({
    queryKey: ['notes', { page, perPage: PER_PAGE, search: debouncedSearch, tag: initialTag }],
    queryFn: () => fetchNotes({ page, perPage: PER_PAGE, search: debouncedSearch, tag: initialTag }),
    placeholderData: previousData => previousData,
  });

  if (isLoading) return <p>Loading, please wait...</p>;
  if (error) return <p>Something went wrong.</p>;

  const notes = data?.notes ?? [];

  return (
    <main>
      <div>
        <SearchBox value={search} onChange={(v) => { setSearch(v); setPage(1); }} />
        <button type='button' onClick={() => setIsFormOpen(true)}>Create note</button>
      </div>
      {isFormOpen && <Modal onClose={() => setIsFormOpen(false)}><NoteForm onClose={() => setIsFormOpen(false)} /></Modal>}
      {notes.length > 0 ? <NoteList notes={notes} /> : <p>No notes found.</p>}
      {data && data.totalPages > 1 && <Pagination pageCount={data.totalPages} currentPage={page} onPageChange={setPage} />}
    </main>
  );
}

