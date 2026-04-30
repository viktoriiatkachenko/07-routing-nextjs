'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useDebouncedCallback } from 'use-debounce';
import { fetchNotes } from '../../lib/api';
import SearchBox from '../../components/SearchBox/SearchBox';
import Pagination from '../../components/Pagination/Pagination';
import NoteList from '../../components/NoteList/NoteList';
import Modal from '../../components/Modal/Modal';
import NoteForm from '../../components/NoteForm/NoteForm';
import css from './page.module.css';

interface NotesClientProps {
  initialPage: number;
  initialSearch: string;
}

const PER_PAGE = 12;

export default function NotesClient({
  initialPage,
  initialSearch,
}: NotesClientProps) {
  const [page, setPage] = useState<number>(initialPage);
  const [search, setSearch] = useState<string>(initialSearch);
  const [inputValue, setInputValue] = useState<string>(initialSearch);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const debouncedSearch = useDebouncedCallback((value: string) => {
    setSearch(value);
    setPage(1);
  }, 500);

  const { data, isLoading, error } = useQuery({
    queryKey: ['notes', page, search],
    queryFn: () =>
      fetchNotes({
        page,
        perPage: PER_PAGE,
        search,
      }),
    placeholderData: previousData => previousData,
  });

  const handleSearchChange = (value: string) => {
    setInputValue(value);
    debouncedSearch(value);
  };

  if (isLoading) {
    return <p>Loading, please wait...</p>;
  }

  if (error) {
    throw error;
  }

  return (
    <main className={css.app}>
      <header className={css.toolbar}>
        <SearchBox value={inputValue} onChange={handleSearchChange} />

        {data && data.totalPages > 1 && (
          <Pagination
            totalPages={data.totalPages}
            currentPage={page}
            onPageChange={setPage}
          />
        )}

        <button className={css.button} onClick={() => setIsModalOpen(true)}>
          Create note +
        </button>
      </header>

      {data && data.notes.length > 0 && <NoteList notes={data.notes} />}

      {data && data.notes.length === 0 && <p>No notes found.</p>}

      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <NoteForm onClose={() => setIsModalOpen(false)} />
        </Modal>
      )}
    </main>
  );
}