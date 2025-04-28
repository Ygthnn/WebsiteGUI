// app/courses/page.tsx
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useCourses, Course } from "./CoursesContext";
import { CourseCard } from "../../components/CourseCard";

export default function CoursesPage() {
  const { courses, removeCourse } = useCourses();
  const [selected, setSelected] = useState<Course | null>(null);

  return (
    <div className="flex">
      {/* ── Left column: course cards ─────────────────────── */}
      <div className="flex flex-col gap-6 p-6 w-64">
        {/* New Course card */}
        <Link href="/courses/new/upload">
          <motion.div
            whileHover={{ scale: 1.03, boxShadow: "0 8px 20px rgba(0,0,0,0.15)" }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="flex flex-col overflow-hidden rounded-lg bg-white shadow-sm cursor-pointer w-64"
          >
            <div className="relative h-16 w-full bg-gray-100">
              <Image
                src="/thumbnails/new-course.png"
                alt="New Course"
                fill
                sizes="64px"
                className="object-contain"
              />
            </div>
            <div className="p-4">
              <h2 className="text-xl font-semibold">Create New Course</h2>
            </div>
          </motion.div>
        </Link>

        {/* Existing courses */}
        {courses.map((c) => (
          <div key={c.id} className="flex items-start gap-2">
            <div onClick={() => setSelected(c)} className="w-64">
              <CourseCard course={c} />
            </div>
            <button
              onClick={() => removeCourse(c.id)}
              className="ml-2 rounded bg-red-600 px-2 py-1 text-white hover:bg-red-700 text-sm"
            >
              Delete
            </button>
          </div>
        ))}
      </div>

      {/* ── Right pane: detail panel ──────────────────────── */}
      <AnimatePresence>
        {selected && (
          <motion.div
            key="detail"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.3 }}
            className="fixed right-0 top-0 h-full w-1/3 bg-white shadow-lg overflow-auto p-6"
          >
            <button
              onClick={() => setSelected(null)}
              className="mb-4 text-gray-500 hover:text-gray-800"
            >
              ✕ Close
            </button>
            <h2 className="text-2xl font-bold mb-2">{selected.title}</h2>
            <p className="mb-4 text-gray-600">{selected.description}</p>

            <section className="mb-6">
              <h3 className="font-medium mb-2">Outline</h3>
              <ol className="list-decimal pl-5 space-y-1">
                {selected.outline.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ol>
            </section>

            <section>
              <h3 className="font-medium mb-2">Files</h3>
              <ul className="list-disc pl-5 space-y-1">
                {selected.files.map((f, i) => (
                  <li key={i}>
                    <a
                      href={f.url}
                      download={f.name}
                      className="text-blue-600 hover:underline"
                    >
                      {f.name}
                    </a>
                  </li>
                ))}
              </ul>
            </section>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
