import { get,post } from '@shared/http';

export type INoteParams = {
  token?: string;
  NoteID: string
}
export function fetchNoteDetail(params: INoteParams) {
  return post('/api/0.1/get_note', params);
}
