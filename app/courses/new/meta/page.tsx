// app/courses/new/meta/page.tsx
"use client";

import Link from "next/link";
import { useDraft } from "../DraftContext";

export default function MetaStep() {
  const { draft, setMeta } = useDraft();
  const { title, level } = draft.meta;

  return (
    <div className="flex flex-col justify-between min-h-[calc(100vh-4rem)]">
      {/* Centered heading */}
      <div className="p-6 text-3xl font-semibold text-center">
        Step 2: Enter course info
      </div>

      {/* Form */}
      <form className="mx-auto w-full max-w-md space-y-6 p-6">
        <div>
          <label className="block text-sm font-medium mb-1">Course Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setMeta({ title: e.target.value })}
            className="w-full rounded border px-3 py-2"
            placeholder="Enter title"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Audience Level</label>
          <select
            value={level}
            onChange={(e) => setMeta({ level: e.target.value })}
            className="w-full rounded border px-3 py-2"
            required
          >
            <option value="" disabled>
              Select level
            </option>
            <option value="high-school">High School</option>
            <option value="professional">Professional</option>
          </select>
        </div>
      </form>

      {/* Navigation buttons */}
      <div className="flex justify-between space-x-4 p-6 border-t">
        <Link
          href="/courses/new/upload"
          className="rounded border px-4 py-2 text-gray-700 hover:bg-gray-100"
        >
          Back
        </Link>
        <Link
          href="/courses/new/outline"
          className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
        >
          Next
        </Link>
      </div>
    </div>
  );
}
