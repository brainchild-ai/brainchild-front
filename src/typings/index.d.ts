declare namespace T {
  export type pageParams = {
    pageNo: string;
    pageSize: string;
    total: string;
  };

  export type NoteList = {
    NoteId: string;
    NoteName: string;
  }
  export type FolderDetail = {
    NotebookID: string;
    NotebookName: string;
    Notelist: NoteList[]
  }

}
