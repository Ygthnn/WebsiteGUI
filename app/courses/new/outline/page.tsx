// app/courses/new/outline/page.tsx
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useDraft } from "../DraftContext";
import { useCourses } from "../../CoursesContext";
import { v4 as uuid } from "uuid";

export default function OutlineStep() {
  const { draft, setOutline } = useDraft();
  const { addCourse } = useCourses();
  const router = useRouter();

  const [loading, setLoading] = useState(true);

  // Simulate async outline generation or use existing draft.outline
  useEffect(() => {
    setTimeout(() => {
      setOutline(draft.outline.length ? draft.outline : ["Introduction"]);
      setLoading(false);
    }, 500);
  }, [draft.outline, setOutline]);

  const handleFinish = () => {
    // Convert File objects into { name, url } entries
    const files = draft.files.map((file) => ({
      name: file.name,
      url: URL.createObjectURL(file),
    }));

    addCourse({
      id: uuid(),
      title: draft.meta.title,
      description: `${draft.outline.length} lessons`,
      thumbnailUrl: files[0]?.url ?? "/thumbnails/new-course.png",
      outline: draft.outline,
      files,
    });

    router.push("/courses");
  };

  return (
    <div className="flex flex-col justify-between min-h-[calc(100vh-4rem)]">
      {/* Step 3 heading */}
      <div className="p-6 text-3xl font-semibold text-center">
        Step 3: Outline & Uploaded Files
      </div>

      <div className="mx-auto w-full max-w-xl space-y-6 p-6">
        {/* Uploaded files list */}
        <section>
          <h3 className="mb-2 text-lg font-medium">Uploaded Materials</h3>
          {draft.files.length === 0 ? (
            <p className="text-gray-500">No files uploaded.</p>
          ) : (
            <ul className="list-disc pl-5 space-y-1 text-gray-700">
              {draft.files.map((file, i) => (
                <li key={i}>
                  <a
                    href={URL.createObjectURL(file)}
                    download={file.name}
                    className="text-blue-600 hover:underline"
                  >
                    {file.name}
                  </a>{" "}
                  <span className="text-sm text-gray-500">
                    ({(file.size / 1024).toFixed(1)} KB)
                  </span>
                </li>
              ))}
            </ul>
          )}
        </section>

        {/* Outline editor or skeleton */}
        <section>
          <h3 className="mb-2 text-lg font-medium">Course Outline</h3>
          {loading ? (
            [...Array(3)].map((_, i) => (
              <div
                key={i}
                className="h-4 w-full animate-pulse rounded bg-gray-200 mb-2"
              />
            ))
          ) : (
            <ol className="list-decimal pl-5 space-y-1 text-gray-700">
              {draft.outline.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ol>
          )}
        </section>
      </div>

      {/* Navigation buttons */}
      <div className="flex justify-between space-x-4 p-6 border-t">
        <Link
          href="/courses/new/meta"
          className="rounded border px-4 py-2 text-gray-700 hover:bg-gray-100"
        >
          Back
        </Link>
        <button
          onClick={handleFinish}
          className="rounded bg-green-600 px-4 py-2 text-white hover:bg-green-700"
        >
          Finish
        </button>
      </div>
    </div>
  );
}
