import { redirect } from 'next/navigation';

export default function NotesFilterIndexPage() {
  return redirect('/notes/filter/all');
}