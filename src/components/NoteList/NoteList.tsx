import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteNote } from '../../services/noteService';
import type { Note } from '../../types/note';
import css from './NoteList.module.css';
export interface NoteListProps {
  notes: Note[];
}

export default function NoteList({ notes }: NoteListProps) {
  const queryClient = useQueryClient();
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const deleteMut = useMutation({
    mutationFn: (id: string) => deleteNote(id),
    onMutate: (id) => setDeletingId(id),
    onSettled: () => setDeletingId(null),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
    },
  });

  return (
    <ul className={css.list}>
      {notes.map((n) => (
        <li key={n.id} className={css.listItem}>
          <h2 className={css.title}>{n.title}</h2>
          <p className={css.content}>{n.content ?? ''}</p>
          <div className={css.footer}>
            <span className={css.tag}>{n.tag}</span>
            <button
              className={css.button}
              onClick={() => deleteMut.mutate(n.id)}
              disabled={deletingId === n.id}
              aria-label={`Delete note ${n.title}`}
            >
              {deletingId === n.id ? 'Deleting...' : 'Delete'}
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}
