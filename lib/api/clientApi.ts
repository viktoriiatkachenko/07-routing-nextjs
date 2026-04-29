import axios from 'axios';
import type { Note, NoteTag } from '../../types/note';

const BASE_URL = 'https://notehub-public.goit.study/api';

const token = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN as string;

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

export interface FetchNotesParams {
  page: number;
  perPage: number;
  search?: string;
  tag?: NoteTag;
}

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

export const fetchNotes = async ({
  page,
  perPage,
  search,
  tag,
}: FetchNotesParams): Promise<FetchNotesResponse> => {
  const params: FetchNotesParams = { page, perPage };

  if (search?.trim()) params.search = search.trim();
  if (tag) params.tag = tag;

  const res = await api.get<FetchNotesResponse>('/notes', { params });
  return res.data;
};

export const createNote = async (data: {
  title: string;
  content: string;
  tag: NoteTag;
}): Promise<Note> => {
  const res = await api.post<Note>('/notes', data);
  return res.data;
};

export const deleteNote = async (id: string): Promise<Note> => {
  const res = await api.delete<Note>(`/notes/${id}`);
  return res.data;
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  const res = await api.get<Note>(`/notes/${id}`);
  return res.data;
};