// app/page.js  ← YE POORA FILE REPLACE KAR DE
import CreateForm from "@/components/CreateForm";
import LinkTable from "@/components/LinkTable";
import Header from "@/components/Header";
import { Toaster } from "react-hot-toast";

export const revalidate = 0; // important for real-time

async function getLinks() {
  const res = await fetch("http://localhost:3000/api/links", {
    cache: "no-store",
  });
  return res.json();
}

export default async function Home() {
  const links = await getLinks();

  return (
    <>
      <Toaster position="top-right" />
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="max-w-6xl mx-auto p-6">
          <h1 className="text-4xl font-bold text-center mb-10 text-gray-800">
            TinyLink - URL Shortener
          </h1>

          {/* Create Form - Client Component */}
          <div className="bg-white rounded-xl shadow-lg p-8 mb-10">
            <h2 className="text-2xl font-semibold mb-6">
              Create New Short Link
            </h2>
            <CreateForm />
          </div>

          {/* Links Table */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-semibold mb-6">Your Links</h2>
            <LinkTable initialLinks={links || []} />
          </div>
        </main>
      </div>
    </>
  );
}
