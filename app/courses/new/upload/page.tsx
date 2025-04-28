"use client";

import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { useDraft } from "../DraftContext";
import Link from "next/link";

export default function UploadStep() {
  const { draft, setFiles } = useDraft();

  const onDrop = useCallback(
    (accepted: File[]) => setFiles([...draft.files, ...accepted]),
    [draft.files, setFiles]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div className="flex flex-col justify-between min-h-[calc(100vh-4rem)]">
      {/* Heading */}
      <div className="p-6 text-3xl font-semibold text-center">
        Step 1: Upload Your Materials
      </div>

      {/* Dropzone */}
      <div
        {...getRootProps()}
        className={`mx-auto w-full max-w-xl flex h-40 cursor-pointer items-center justify-center
          rounded-lg border-2 border-dashed transition
          ${isDragActive ? "border-blue-600 bg-blue-50" : "border-gray-300 bg-white"}`}
      >
        <input {...getInputProps()} />
        {isDragActive
          ? "Drop files here…"
          : "Drag & drop files, or click to select"}
      </div>

      {/* Uploaded file list */}
      <ul className="mx-auto mt-4 max-w-xl list-disc space-y-1 pl-5 text-sm text-gray-700">
        {draft.files.length === 0 ? (
          <li className="text-center text-gray-500">No files uploaded yet.</li>
        ) : (
          draft.files.map((file, i) => (
            <li key={i}>
              {file.name} — {(file.size / 1024).toFixed(1)} KB
            </li>
          ))
        )}
      </ul>

      {/* Next button */}
      <div className="flex justify-end space-x-4 p-6 border-t">
        <Link
          href="/courses/new/meta"
          className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
        >
          Next
        </Link>
      </div>
    </div>
  );
}
