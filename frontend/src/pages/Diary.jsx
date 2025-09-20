
import { Link } from "react-router-dom";
import { useDiaries } from "../hooks/useDiaries";
import { FaFeatherAlt } from 'react-icons/fa';

function Diary() {
  const { data: entries, isLoading, isError } = useDiaries();

  
  const createPreview = (htmlContent) => {
    if (!htmlContent) return "";
   
    const plainText = htmlContent.replace(/<[^>]*>?/gm, '');
    if (plainText.length > 150) {
      return plainText.slice(0, 150) + "...";
    }
    return plainText;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen py-16 flex justify-center items-center">
        <p className="text-lg text-gray-600">Loading your memories...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen py-16 flex justify-center items-center">
        <p className="text-lg text-red-600">Failed to load diary entries.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-16 bg-gradient-to-b from-gray-50 via-purple-50 to-pink-50 p-6 flex flex-col items-center">
      <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">
        📖 My Diary
      </h1>

      <Link
        to="/new-diary"
        className="inline-flex items-center bg-purple-500 hover:bg-purple-600 text-white px-8 py-4 rounded-2xl shadow-lg transition-transform hover:scale-105 duration-300 mb-12 text-lg font-semibold"
      >
        <FaFeatherAlt className="mr-3" />
        Write a New Memory
      </Link>

      <div className="w-full max-w-3xl space-y-6">
        {entries && entries.length > 0 ? (
          entries.map((entry) => (
            
            <Link
              key={entry._id}
              to={`/diary/${entry._id}`}
              className="block transition-transform duration-300 hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2 rounded-2xl"
            >
              <article className="bg-white shadow-xl rounded-2xl p-6 h-full flex flex-col">
                <h3 className="text-2xl font-semibold text-gray-800 mb-1">
                  {entry.title || "Untitled Entry"}
                </h3>
                <p className="text-sm text-gray-500 mb-4">
                  {new Date(entry.createdAt).toLocaleDateString("en-US", {
                    year: 'numeric', month: 'long', day: 'numeric'
                  })}
                </p>

             
                <p className="text-gray-700 leading-relaxed flex-grow">
                  {createPreview(entry.content)}
                </p>

                <div className="mt-4 text-purple-600 font-semibold self-start">
                  Read Full Diary &rarr;
                </div>
              </article>
            </Link>
          ))
        ) : (
          <div className="text-center bg-white/50 rounded-2xl p-10">
             <p className="text-gray-600 text-lg">
               No diary entries yet.
             </p>
             <p className="text-gray-500 mt-2">
               Click the button above to write your first memory! 🌸
             </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Diary;
