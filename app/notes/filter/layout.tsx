import css from './layout.module.css';

export default function FilterLayout({
  sidebar,
  notes,
}: {
  sidebar: React.ReactNode;
  notes: React.ReactNode;
}) {
  return (
    <main className={css.container}>
      <aside className={css.sidebar}>{sidebar}</aside>
      <section className={css.notesWrapper}>{notes}</section>
    </main>
  );
}