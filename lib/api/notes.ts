import { noteHubApi } from './client';
import type {
  CreateNotePayload,
  Note,
  NoteFilterTag,
  NoteTag,
} from '@/types/note';

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

export interface FetchNotesParams {
  page: number;
  perPage: number;
  search?: string;
  tag?: NoteFilterTag;
}

export const fetchNotes = async ({
  page,
  perPage,
  search = '',
  tag = 'all',
}: FetchNotesParams): Promise<FetchNotesResponse> => {
  const trimmedSearch = search.trim();

  const params: {
    page: number;
    perPage: number;
    search?: string;
    tag?: NoteTag;
  } = {
    page,
    perPage,
  };

  if (trimmedSearch) {
    params.search = trimmedSearch;
  }

  if (tag !== 'all') {
    params.tag = tag;
  }

  const { data } = await noteHubApi.get<FetchNotesResponse>('/notes', {
    params,
  });

  return data;
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  const { data } = await noteHubApi.get<Note>(`/notes/${id}`);
  return data;
};

export const createNote = async (
  noteData: CreateNotePayload
): Promise<Note> => {
  const { data } = await noteHubApi.post<Note>('/notes', noteData);
  return data;
};

export const deleteNote = async (id: string): Promise<Note> => {
  const { data } = await noteHubApi.delete<Note>(`/notes/${id}`);
  return data;
};
