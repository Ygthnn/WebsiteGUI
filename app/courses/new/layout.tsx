// app/courses/new/layout.tsx
"use client";

import { ReactNode } from "react";
import { useSelectedLayoutSegment } from "next/navigation";
import { DraftProvider } from "./DraftContext";

const steps = ["upload", "meta", "outline"];
const labels = ["1. Upload", "2. Info", "3. Outline"];

export default function WizardLayout({ children }: { children: ReactNode }) {
  const segment = useSelectedLayoutSegment() || steps[0];
  const currentIndex = steps.indexOf(segment);

  return (
    <DraftProvider>
      {/* Full-screen container with vertical centering, horizontal left alignment */}
      <div className="flex flex-col justify-center items-start min-h-screen bg-gray-50">
        <div className="w-full max-w-xl mx-6 bg-white shadow-lg rounded-lg overflow-hidden">
          {/* Step indicator bar */}
          <div className="flex border-b bg-white">
            {labels.map((label, i) => (
              <div
                key={i}
                className={`flex-1 px-4 py-3 text-center text-sm font-medium ${
                  i === currentIndex
                    ? "border-b-2 border-blue-600 text-blue-600"
                    : "text-gray-400"
                }`}
              >
                {label}
              </div>
            ))}
          </div>

          {/* Page content area */}
          <div className="p-6 bg-white">
            {children}
          </div>
        </div>
      </div>
    </DraftProvider>
  );
}
