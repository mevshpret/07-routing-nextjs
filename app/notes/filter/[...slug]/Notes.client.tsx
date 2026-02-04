"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";

import { fetchNotes, type FetchNotesResponse } from "@/lib/api";
import type { Note } from "@/types/note";

import SearchBox from "@/components/SearchBox/SearchBox";
import Pagination from "@/components/Pagination/Pagination";
import NoteList from "@/components/NoteList/NoteList";
import css from "../../NotesPage.module.css";

const PER_PAGE = 10;

interface NotesClientProps {
  tag: string;
}

export default function NotesClient({ tag }: NotesClientProps) {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  const normalizedTag = tag === "all" ? undefined : tag;

  useEffect(() => {
    const id = window.setTimeout(() => {
      setDebouncedSearch(search.trim());
      setPage(1);
    }, 300);

    return () => window.clearTimeout(id);
  }, [search]);

  const { data, isLoading, isError } = useQuery<FetchNotesResponse, Error>({
    queryKey: ["notes", { page, search: debouncedSearch, tag: normalizedTag }],
    queryFn: () =>
      fetchNotes({
        page,
        perPage: PER_PAGE,
        search: debouncedSearch,
        tag: normalizedTag,
      }),
    refetchOnMount: false,
  });

  const notes: Note[] = data?.notes ?? [];
  const totalPages: number = data?.totalPages ?? 1;

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Failed to load notes.</p>;

  return (
    <>
      <SearchBox value={search} onChange={setSearch} />

      {/* тепер це Link на маршрут створення */}
      <Link href="/notes/action/create" className={css.button}>
        Create note +
      </Link>

      <NoteList notes={notes} detailsBasePath={`/notes/filter/${tag}`} />

      <Pagination page={page} totalPages={totalPages} onChange={setPage} />
    </>
  );
}
