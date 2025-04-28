// app/courses/new/DraftContext.tsx
"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

interface CourseMeta { title: string; level: string; }
interface DraftState { files: File[]; meta: CourseMeta; outline: string[]; }

interface ContextValue {
  draft: DraftState;
  setFiles: (f: File[]) => void;
  setMeta: (m: Partial<CourseMeta>) => void;
  setOutline: (o: string[]) => void;
}

const DraftContext = createContext<ContextValue | undefined>(undefined);

export function DraftProvider({ children }: { children: ReactNode }) {
  const [draft, setDraft] = useState<DraftState>({
    files: [], meta: { title: "", level: "" }, outline: [],
  });
  const setFiles = (files: File[]) => setDraft(d => ({ ...d, files }));
  const setMeta = (meta: Partial<CourseMeta>) =>
    setDraft(d => ({ ...d, meta: { ...d.meta, ...meta } }));
  const setOutline = (outline: string[]) =>
    setDraft(d => ({ ...d, outline }));
  return (
    <DraftContext.Provider value={{ draft, setFiles, setMeta, setOutline }}>
      {children}
    </DraftContext.Provider>
  );
}

export function useDraft() {
  const ctx = useContext(DraftContext);
  if (!ctx) throw new Error("useDraft must be inside DraftProvider");
  return ctx;
}
