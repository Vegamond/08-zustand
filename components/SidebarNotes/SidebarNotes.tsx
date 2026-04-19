'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { NoteFilterTag } from '@/types/note';
import css from './SidebarNotes.module.css';

const tags: NoteFilterTag[] = [
  'all',
  'Work',
  'Personal',
  'Meeting',
  'Shopping',
  'Todo',
];

export default function SidebarNotes() {
  const pathname = usePathname();

  return (
    <nav className={css.sidebar} aria-label="Filter notes by tag">
      <ul className={css.list}>
        {tags.map(tag => {
          const href = `/notes/filter/${tag}`;
          const isActive = pathname === href;

          return (
            <li key={tag}>
              <Link
                href={href}
                className={`${css.link} ${isActive ? css.active : ''}`}
              >
                {tag === 'all' ? 'All notes' : tag}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
