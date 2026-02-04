import type { FC } from "react";
import css from "./not-found.module.css";
import type { Metadata } from "next";

const siteUrl = "https://notehub.vercel.app"; // потім заміниш на свій Vercel

export const metadata: Metadata = {
  title: "Page not found | NoteHub",
  description: "This page does not exist in NoteHub.",
  openGraph: {
    title: "Page not found | NoteHub",
    description: "This page does not exist in NoteHub.",
    url: `${siteUrl}/not-found`,
    images: ["https://ac.goit.global/fullstack/react/notehub-og-meta.jpg"],
  },
};

const NotFoundPage: FC = () => {
  return (
    <div className={css.wrapper}>
      <h1 className={css.title}>404 - Page not found</h1>
      <p className={css.description}>
        Sorry, the page you are looking for does not exist.
      </p>
    </div>
  );
};

export default NotFoundPage;
