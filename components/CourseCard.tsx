// components/CourseCard.tsx
"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

export interface Course {
  id: string;
  title: string;
  description: string;
  thumbnailUrl: string;
}

// Add an optional onClick prop. If provided, we render a <div> and call it;
// otherwise we render a <Link> to the course’s page.
export function CourseCard({
  course,
  onClick,
}: {
  course: Course;
  onClick?: () => void;
}) {
  const cardContent = (
    <motion.div
      whileHover={{ scale: 1.03, boxShadow: "0 8px 20px rgba(0,0,0,0.15)" }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className={`block overflow-hidden rounded-lg bg-white shadow-sm 
        ${onClick ? "cursor-pointer" : ""}`}
      onClick={onClick}
      style={onClick ? { pointerEvents: "auto" } : undefined}
    >
      <div className="relative h-40 w-full bg-gray-100">
        <Image
          src={course.thumbnailUrl}
          alt={course.title}
          fill
          sizes="100%"
          className="object-cover"
        />
      </div>
      <div className="p-4">
        <h2 className="text-xl font-semibold">{course.title}</h2>
        <p className="mt-2 text-gray-600 text-sm">{course.description}</p>
        {!onClick && (
          <button className="mt-4 inline-block rounded bg-blue-600 px-4 py-2 text-white transition hover:shadow-lg hover:-translate-y-1">
            Continue
          </button>
        )}
      </div>
    </motion.div>
  );

  // If onClick is provided, just return the div. Otherwise wrap in Link:
  return onClick ? (
    cardContent
  ) : (
    <Link href={`/courses/${course.id}`}>{cardContent}</Link>
  );
}
