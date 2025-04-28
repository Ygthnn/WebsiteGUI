// app/courses/CoursesContext.tsx
"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

// Extend Course to include outline & files
export interface Course {
  id: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  outline: string[];
  files: { name: string; url: string }[];
}

interface CoursesContextValue {
  courses: Course[];
  addCourse: (course: Course) => void;
  removeCourse: (id: string) => void;
}

const CoursesContext = createContext<CoursesContextValue | undefined>(
  undefined
);

export function CoursesProvider({ children }: { children: ReactNode }) {
  const [courses, setCourses] = useState<Course[]>(() => {
    if (typeof window === "undefined") return [];
    try {
      const json = localStorage.getItem("courses");
      return json ? JSON.parse(json) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("courses", JSON.stringify(courses));
  }, [courses]);

  const addCourse = (course: Course) =>
    setCourses((prev) => [...prev, course]);
  const removeCourse = (id: string) =>
    setCourses((prev) => prev.filter((c) => c.id !== id));

  return (
    <CoursesContext.Provider value={{ courses, addCourse, removeCourse }}>
      {children}
    </CoursesContext.Provider>
  );
}

export function useCourses() {
  const ctx = useContext(CoursesContext);
  if (!ctx) throw new Error("useCourses must be used within CoursesProvider");
  return ctx;
}
