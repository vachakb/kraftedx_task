import { SignOutButton } from "../components/SignOut";

// `app/dashboard/page.tsx` is the UI for the `/dashboard` URL
export default function Page() {
  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="font-bold text-3xl">Welcome to dashboard!</h1>
      <div className="w-250 mt-9 text-center p-5 bg-gradient-to-r from-indigo-500/25 via-purple-500/25 to-pink-500/25 text-base/9 border border-white-200 rounded-lg mb-10">
        Hi, My name is Vacha Buch. This dashboard page is a part of the practical task given by KraftedX. 
        It is the second stage of the recruitment process for a frontend developer intern. I am delighted to be given a chance to 
        work on this task and I am looking forward to the next steps in the process. I have implemented a simple authentication system
        in Nextjs using Clerk. As asked in the assignment, I have created my own custom sign-in page using Clerk's API.
        I have also added a sign-in button using Google OAuth. The dashboard page is protected and can only be
        accessed by authenticated users. I have also added a sign-out button to the dashboard page. The second part of this task
        was to replicate the interactive gradient component from the KraftedX website. I have used animations in Tailwind CSS to create the same. <br></br>
        <b>Please note:</b> As I have ongoing end semester exams, I could only work on this task for 2 days. I have tried my best to complete the task as per the requirements but 
        I am aware that some parts of the code may not be perfect. Moreover, I only knew the basics of Nextjs and Tailwind before starting this task 
        so it was an interesting learning experience for me. I am grateful for this opportunity to learn and showcase my skills at the same time. 
        I hope you like my work and I am looking forward to your feedback.

      </div>
      <SignOutButton/>
    </div>
  )
}