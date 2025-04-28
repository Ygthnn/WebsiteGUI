// app/courses/layout.tsx
import { ReactNode } from "react";
import { CoursesProvider } from "./CoursesContext";

export default function CoursesLayout({ children }: { children: ReactNode }) {
  return <CoursesProvider>{children}</CoursesProvider>;
}
