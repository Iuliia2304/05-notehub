import axios, { type AxiosInstance } from 'axios';
import type { Note, NoteTag } from '../types/note';

const BASE_URL = 'https://notehub-public.goit.study/api';
const token = import.meta.env.VITE_NOTEHUB_TOKEN as string | undefined;

if (!token) {
  console.warn('[NoteHub] VITE_NOTEHUB_TOKEN is missing. Set it in your .env');
}

export const api: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: token ? { Authorization: `Bearer ${token}` } : undefined,
});

export interface FetchNotesParams {
  page: number; // 1-based
  perPage: number;
  search?: string;
}

export interface FetchNotesResponse {
  page: number;
  perPage: number;
  totalPages: number;
  totalItems: number;
  results: Note[];
}

export interface CreateNoteDto {
  title: string;
  content?: string;
  tag: NoteTag;
}

export async function fetchNotes(params: FetchNotesParams): Promise<FetchNotesResponse> {
  const res = await api.get('/notes', { params });
  const d = res.data as {
    notes?: Note[];
    totalPages?: number;
    page?: number;
    perPage?: number;
  };

  return {
    page: Number(d.page ?? params.page),
    perPage: Number(d.perPage ?? params.perPage),
    totalPages: Number(d.totalPages ?? 1),
    totalItems: d.notes?.length ?? 0,
    results: d.notes ?? [],
  };
}

export async function createNote(dto: CreateNoteDto): Promise<Note> {
  const res = await api.post('/notes', dto);
  return res.data as Note;
}

export async function deleteNote(id: string): Promise<Note> {
  const res = await api.delete(`/notes/${id}`);
  return res.data as Note;
}
