import css from './NoteList.module.css';
import type { Note } from '../../types/note';
import type { MouseEvent } from 'react';

export interface NoteListProps {
  notes: Note[];
  onDelete: (id: string) => void;
  isDeletingId?: string | null;
}

export default function NoteList({ notes, onDelete, isDeletingId }: NoteListProps) {
  const handleDelete = (e: MouseEvent<HTMLButtonElement>, id: string) => {
    e.preventDefault();
    onDelete(id);
  };

  return (
    <ul className={css.list}>
      {notes.map((n) => (
        <li key={n.id} className={css.listItem}>
          <h2 className={css.title}>{n.title}</h2>
          {n.content && <p className={css.content}>{n.content}</p>}
          <div className={css.footer}>
            <span className={css.tag}>{n.tag}</span>
            <button
              className={css.button}
              onClick={(e) => handleDelete(e, n.id)}
              disabled={isDeletingId === n.id}
              aria-label={`Delete note ${n.title}`}
            >
              {isDeletingId === n.id ? 'Deleting...' : 'Delete'}
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}
