'use client';

import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { fetchNoteById } from '@/lib/api';
import Modal from '@/components/Modal/Modal';
import css from './NotePreview.module.css';

interface NotePreviewProps {
  id: string;
}

export default function NotePreview({ id }: NotePreviewProps) {
  const router = useRouter();

  const {
    data: note,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['note', id],
    queryFn: () => fetchNoteById(id),
    enabled: Boolean(id),
    refetchOnMount: false,
  });

  const handleClose = () => {
    router.back();
  };

  let content: React.ReactNode;

  if (isLoading) {
    content = <p>Loading, please wait...</p>;
  } else if (error || !note) {
    content = <p>Something went wrong.</p>;
  } else {
    const createdDate = new Date(note.createdAt).toLocaleDateString();

    content = (
      <article className={css.wrapper}>
        <div className={css.header}>
          <h2 className={css.title}>{note.title}</h2>
          <span className={css.tag}>{note.tag}</span>
        </div>

        <p className={css.content}>{note.content}</p>
        <p className={css.date}>{createdDate}</p>
      </article>
    );
  }

  return <Modal onClose={handleClose}>{content}</Modal>;
}
