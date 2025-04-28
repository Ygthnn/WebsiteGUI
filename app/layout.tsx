// app/layout.tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Lenno",
  description: "Course‐builder prototype",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body
        className={`
          ${geistSans.variable} ${geistMono.variable}
          antialiased bg-white text-gray-900 min-h-screen
        `}
      >
        {/* ── Navigation ─────────────────────────────────────────── */}
        <header className="bg-white shadow-sm">
          <nav className="mx-auto grid max-w-4x1 grid-cols-15 items-center px-4 py-4">
            {/* Column 1: Lenno (far left) */}
            <div className="justify-self-start">
              <Link href="/" className="text-lg font-medium text-gray-700 hover:text-gray-900">
                Lenno
              </Link>
            </div>

            {/* Column 2: Dashboard (middle-left) */}
            <div className="justify-self-center">
              <Link
                href="/dashboard"
                className="text-lg font-medium text-gray-700 hover:text-gray-900"
              >
                Dashboard
              </Link>
            </div>

            {/* Column 3: Courses (middle-right) */}
            <div className="justify-self-center">
              <Link
                href="/courses"
                className="text-lg font-medium text-gray-700 hover:text-gray-900"
              >
                Courses
              </Link>
            </div>

            {/* Column 4: Settings (far right) */}
            <div className="justify-self-end">
              <Link
                href="/settings"
                className="text-lg font-medium text-gray-700 hover:text-gray-900"
              >
                Settings
              </Link>
            </div>
          </nav>
        </header>

        {/* ── Main Content ───────────────────────────────────────── */}
        <main className="mx-auto w-full max-w-4xl px-4 py-8">
          {children}
        </main>
      </body>
    </html>
  );
}
