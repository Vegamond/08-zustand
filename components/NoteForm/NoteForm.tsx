'use client';

import { ErrorMessage, Field, Form, Formik } from 'formik';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import * as Yup from 'yup';
import { createNote } from '@/lib/api';
import type { CreateNotePayload, NoteTag } from '@/types/note';
import css from './NoteForm.module.css';

const tagOptions: NoteTag[] = [
  'Todo',
  'Work',
  'Personal',
  'Meeting',
  'Shopping',
];

interface NoteFormValues {
  title: string;
  content: string;
  tag: '' | NoteTag;
}

export interface NoteFormProps {
  onClose: () => void;
}

const initialValues: NoteFormValues = {
  title: '',
  content: '',
  tag: '',
};

const validationSchema = Yup.object({
  title: Yup.string()
    .min(3, 'Title must be at least 3 characters')
    .max(50, 'Title must be at most 50 characters')
    .required('Title is required'),
  content: Yup.string().max(500, 'Content must be at most 500 characters'),
  tag: Yup.string()
    .oneOf(tagOptions, 'Select a valid tag')
    .required('Tag is required'),
});

export default function NoteForm({ onClose }: NoteFormProps) {
  const queryClient = useQueryClient();

  const createNoteMutation = useMutation({
    mutationFn: (newNote: CreateNotePayload) => createNote(newNote),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
      onClose();
    },
  });

  const handleSubmit = async (values: NoteFormValues) => {
    await createNoteMutation.mutateAsync({
      title: values.title.trim(),
      content: values.content.trim(),
      tag: values.tag as NoteTag,
    });
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      <Form className={css.form}>
        <h2>Create note</h2>

        <label className={css.formGroup}>
          <span>Title</span>
          <Field className={css.input} type="text" name="title" />
          <ErrorMessage className={css.error} component="span" name="title" />
        </label>

        <label className={css.formGroup}>
          <span>Content</span>
          <Field className={css.textarea} as="textarea" name="content" rows={6} />
          <ErrorMessage className={css.error} component="span" name="content" />
        </label>

        <label className={css.formGroup}>
          <span>Tag</span>
          <Field className={css.select} as="select" name="tag">
            <option value="">Select tag</option>
            {tagOptions.map((tag) => (
              <option key={tag} value={tag}>
                {tag}
              </option>
            ))}
          </Field>
          <ErrorMessage className={css.error} component="span" name="tag" />
        </label>

        <div className={css.actions}>
          <button className={css.cancelButton} type="button" onClick={onClose}>
            Cancel
          </button>

          <button
            className={css.submitButton}
            type="submit"
            disabled={createNoteMutation.isPending}
          >
            {createNoteMutation.isPending ? 'Creating...' : 'Create note'}
          </button>
        </div>
      </Form>
    </Formik>
  );
}
