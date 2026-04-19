import css from './FilterLayout.module.css';

interface NotesFilterLayoutProps {
  children: React.ReactNode;
  sidebar: React.ReactNode;
}

export default function NotesFilterLayout({
  children,
  sidebar,
}: NotesFilterLayoutProps) {
  return (
    <div className={css.wrapper}>
      <aside className={css.sidebar}>{sidebar}</aside>
      <section className={css.content}>{children}</section>
    </div>
  );
}
