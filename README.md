Lenno Frontend  
===============  

A Next.js (App-Router) + Tailwind CSS + TypeScript app for creating and managing interactive courses.  
Includes a 3-step wizard (Upload → Meta → Outline), a vertical course list with add/delete, and a slide-in details panel.  

Tech Stack  
----------  
• Next.js 15.3.1 (App Router)  
• React 19.1.0  
• TypeScript 5.8.3  
• Tailwind CSS 4.1.4  
• Framer Motion for animations  
• react-dropzone for file uploads  

Getting Started  
---------------  
1. Clone the repo:  
   git clone https://github.com/<your-username>/<your-repo>.git  
   cd <your-repo>  

2. Install dependencies:  
   npm install  
   or  
   pnpm install  

3. Run the dev server:  
   npm run dev  
   or  
   pnpm dev  

4. Open http://localhost:3000 in your browser.  

Project Structure  
-----------------  
/  
├ app/  
│  ├ globals.css           Tailwind base/components/utilities  
│  ├ layout.tsx            Global HTML structure + nav bar  
│  ├ dashboard/…  
│  └ courses/  
│     ├ layout.tsx         Wraps CoursesProvider  
│     ├ CoursesContext.tsx Browser-persistent course store  
│     ├ page.tsx           Course list + details panel  
│     └ new/  
│        ├ layout.tsx      WizardLayout with step bar + DraftProvider  
│        ├ DraftContext.tsx Draft state: files, meta, outline  
│        ├ upload/page.tsx Step 1: file upload  
│        ├ meta/page.tsx   Step 2: course info form  
│        └ outline/page.tsx Step 3: outline editor + finish  
├ components/  
│  └ CourseCard.tsx        Animated responsive card  
├ public/  
│  └ thumbnails/…  
├ next.config.js  
├ tailwind.config.ts  
└ package.json  

Common Issues & Troubleshooting  
--------------------------------  

1) PowerShell Execution Policy  
   • Error: “running scripts is disabled on this system”  
   • Fix:  
     Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned  

2) OneDrive “readlink” Errors  
   • Error: EINVAL readlink ‘.next/…’  
   • Fix A: In File Explorer, right-click project folder → “Always keep on this device”  
   • Fix B: Move project outside OneDrive (e.g. C:\Projects\web)  

3) Tailwind Unknown Utility  
   • Error: Cannot apply unknown utility class: bg-white  
   • Fix: Ensure app/globals.css contains the three @tailwind directives and is imported in app/layout.tsx  

4) Nested <a> Hydration Errors  
   • Error: In HTML, <a> cannot be a descendant of <a>  
   • Fix: Don’t wrap a motion.a inside Next’s Link; use motion.div or div with onClick  

5) Module Not Found on Imports  
   • Error: Can’t resolve '../../components/CourseCard'  
   • Fix: Confirm file exists at components/CourseCard.tsx and import with correct relative path  

6) useDraft must be inside DraftProvider  
   • Runtime error when rendering wizard steps  
   • Fix: Wrap all /courses/new pages in app/courses/new/layout.tsx with <DraftProvider>  

Next Steps  
----------  
• Dark-mode toggle (Tailwind dark: variants)  
• Edit course flow (update existing course data)  
• Real backend API for persistence (Route Handlers ∕ JSON ∕ uploads)  
• Drag-and-drop outline reordering  
• Sticky sidebar layout or responsive menu  

Enjoy building with Lenno! Please open issues or submit PRs for improvements.
