// app/notes/filter/[...slug]/page.tsx
import type { Metadata } from "next";
import {
  QueryClient,
  dehydrate,
  HydrationBoundary,
} from "@tanstack/react-query";

import { fetchNotes } from "@/lib/api";
import NotesClient from "./Notes.client";

interface RouteParams {
  slug?: string[];
}

interface FilterPageProps {
  params: Promise<RouteParams>;
}

const siteUrl = "http://localhost:3000"; // потім заміниш на https://<твій-проєкт>.vercel.app

export async function generateMetadata({
  params,
}: FilterPageProps): Promise<Metadata> {
  const { slug } = await params;

  const rawTag = slug?.[0] ?? "all";
  const tagLabel = rawTag === "all" ? "All" : rawTag;

  const title = `Notes: ${tagLabel} | NoteHub`;
  const description = `Browse notes filtered by: ${tagLabel}.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `${siteUrl}/notes/filter/${rawTag}`,
      images: ["https://ac.goit.global/fullstack/react/notehub-og-meta.jpg"],
    },
  };
}

async function getDehydratedState(tag: string | undefined) {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["notes", { page: 1, search: "", tag }],
    queryFn: () =>
      fetchNotes({
        page: 1,
        perPage: 10,
        search: "",
        tag,
      }),
  });

  return dehydrate(queryClient);
}

export default async function FilterPage({ params }: FilterPageProps) {
  const { slug } = await params;

  const rawTag = slug?.[0] ?? "all";
  const normalizedTag = rawTag === "all" ? undefined : rawTag;

  const state = await getDehydratedState(normalizedTag);

  return (
    <HydrationBoundary state={state}>
      <NotesClient tag={rawTag} />
    </HydrationBoundary>
  );
}
