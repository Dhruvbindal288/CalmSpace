import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axiosInstance from '../lib/axios';
import { FaArrowLeft } from 'react-icons/fa';

function UpdateDiary() {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();


  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  
  const { data: diaryData, isLoading: isLoadingDiary } = useQuery({
    queryKey: ['diary', id],
    queryFn: async () => {
      const { data } = await axiosInstance.get(`/diary/${id}`);
      return data;
    },
    enabled: !!id,
  });

  
  useEffect(() => {
    if (diaryData) {
      setTitle(diaryData.title || '');
      
      setContent(diaryData.content || '');
    }
  }, [diaryData]);

  
  const { mutate: updateDiary, isLoading: isUpdating } = useMutation({
    mutationFn: async (updatedEntry) => {
      await axiosInstance.put(`/diary/update/${id}`, updatedEntry);
    },
    onSuccess: () => {
     
      queryClient.invalidateQueries({ queryKey: ['diaries'] });
      queryClient.invalidateQueries({ queryKey: ['diary', id] });
     
      navigate(`/diary/${id}`);
    },
    onError: (error) => {
      console.error("Failed to update memory:", error);
      
      alert('Failed to update the memory. Please try again.');
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) {
      return alert('Title cannot be empty.');
    }
    updateDiary({ title, content });
  };

 
  if (isLoadingDiary) {
    return <div className="flex justify-center items-center min-h-screen">Loading editor...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-100 to-blue-100 p-4 sm:p-6 md:p-8">
      <div className="max-w-4xl mx-auto bg-white/90 backdrop-blur-md rounded-2xl shadow-lg p-6 sm:p-8">
        <Link to={`/diary/${id}`} className="inline-flex items-center text-purple-600 hover:text-purple-800 mb-6 transition-colors">
          <FaArrowLeft className="mr-2" />
          Back to entry
        </Link>
        
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Edit Your Day</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="title" className="block text-lg font-medium text-gray-700 mb-2">
              Title
            </label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-2 text-lg border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
              placeholder="A title for your memory..."
            />
          </div>

          <div>
            <label htmlFor="content" className="block text-lg font-medium text-gray-700 mb-2">
              Content
            </label>
            
            <textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows="15"
              className="w-full px-4 py-2 text-lg border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
              placeholder="Write your thoughts here..."
            />
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isUpdating}
              className="px-8 py-3 bg-purple-600 text-white font-semibold rounded-lg shadow-md hover:bg-purple-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isUpdating ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UpdateDiary;
