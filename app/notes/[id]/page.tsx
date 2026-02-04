// app/notes/[id]/page.tsx
import type { Metadata } from "next";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";

import { fetchNoteById } from "@/lib/api";
import NoteDetailsClient from "./NoteDetails.client";

interface NoteDetailsPageProps {
  params: Promise<{ id: string }>;
}

const siteUrl = "http://localhost:3000"; // потім заміниш на https://<твій-проєкт>.vercel.app

export async function generateMetadata({
  params,
}: NoteDetailsPageProps): Promise<Metadata> {
  const { id } = await params;

  try {
    const note = await fetchNoteById(id);

    const title = `${note.title} | NoteHub`;
    const description =
      (note.content ?? "").trim().slice(0, 160) || "Note details in NoteHub.";

    return {
      title,
      description,
      openGraph: {
        title,
        description,
        url: `${siteUrl}/notes/${id}`,
        images: ["https://ac.goit.global/fullstack/react/notehub-og-meta.jpg"],
      },
    };
  } catch {
    const title = "Note not found | NoteHub";
    const description = "This note does not exist in NoteHub.";

    return {
      title,
      description,
      openGraph: {
        title,
        description,
        url: `${siteUrl}/notes/${id}`,
        images: ["https://ac.goit.global/fullstack/react/notehub-og-meta.jpg"],
      },
    };
  }
}

export default async function NoteDetailsPage({
  params,
}: NoteDetailsPageProps) {
  const { id } = await params;

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NoteDetailsClient />
    </HydrationBoundary>
  );
}
