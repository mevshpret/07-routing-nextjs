"use client";
import styles from './NoteForm.module.css';
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createNote } from "../../lib/api";
import * as Yup from "yup";
import type { NoteTag } from "../../types/note";

interface NoteFormProps {
  onClose: () => void;
}

const allowedTags: NoteTag[] = [
  "Todo",
  "Work",
  "Personal",
  "Meeting",
  "Shopping",
];

const schema = Yup.object({
  title: Yup.string().required("Title is required").min(3).max(50),
  content: Yup.string().max(500),
  tag: Yup.mixed<NoteTag>()
    .oneOf(allowedTags, "Invalid tag")
    .required("Tag is required"),
});

export default function NoteForm({ onClose }: NoteFormProps) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: createNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      onClose();
    },
  });

  return (
    <Formik
      initialValues={{ title: "", content: "", tag: "Todo" as NoteTag }}
      validationSchema={schema}
      onSubmit={(vals: { title: string; content: string; tag: NoteTag }) => mutation.mutate(vals)}
    >
      {() => (
        <Form className={styles.form}>
          <div className={styles.formGroup}>
            <label>Title</label>
            <Field className={styles.input} name="title" />
            <ErrorMessage className={styles.error} name="title" component="div" />
          </div>

          <div className={styles.formGroup}>
            <label>Content</label>
            <Field as="textarea" className={styles.textarea} name="content" />
            <ErrorMessage className={styles.error} name="content" component="div" />
          </div>

          <div className={styles.formGroup}>
            <label>Tag</label>
            <Field as="select" className={styles.select} name="tag">
              {allowedTags.map((tag) => (
                <option key={tag} value={tag}>{tag}</option>
              ))}
            </Field>
            <ErrorMessage className={styles.error} name="tag" component="div" />
          </div>

          <div className={styles.actions}>
            <button type="button" className={styles.cancelButton} onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className={styles.submitButton}>
              Create
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
}
