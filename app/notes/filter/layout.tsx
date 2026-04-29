import css from './layout.module.css';

export default function FilterLayout({
  children,
  sidebar,
  params,
}: LayoutProps<'/notes/filter'>) {
  return (
    <main className={css.container}>
      <aside className={css.sidebar}>{sidebar}</aside>
      <section className={css.notesWrapper}>{children}</section>
    </main>
  );
}