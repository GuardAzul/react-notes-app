export interface Note {
    id: number;
    title: string;
    content: string;
    userId: number;
}

export interface NoteResponse {
    Notes?: Note[];
    Response: string;
    Error?: string;
}