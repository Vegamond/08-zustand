import axios from 'axios';
import type { CreateNotePayload, Note } from '@/types/note';

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

export interface FetchNotesParams {
  page: number;
  perPage: number;
  search?: string;
}

const TOKEN = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;

const noteHubApi = axios.create({
  baseURL: 'https://notehub-public.goit.study/api',
  headers: {
    Authorization: `Bearer ${TOKEN}`,
  },
});

export const fetchNotes = async ({
  page,
  perPage,
  search = '',
}: FetchNotesParams): Promise<FetchNotesResponse> => {
  const trimmedSearch = search.trim();

  const params: FetchNotesParams = {
    page,
    perPage,
  };

  if (trimmedSearch) {
    params.search = trimmedSearch;
  }

  const { data } = await noteHubApi.get<FetchNotesResponse>('/notes', { params });
  return data;
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  const { data } = await noteHubApi.get<Note>(`/notes/${id}`);
  return data;
};

export const createNote = async (noteData: CreateNotePayload): Promise<Note> => {
  const { data } = await noteHubApi.post<Note>('/notes', noteData);
  return data;
};

export const deleteNote = async (id: string): Promise<Note> => {
  const { data } = await noteHubApi.delete<Note>(`/notes/${id}`);
  return data;
};
