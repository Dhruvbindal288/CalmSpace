import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axiosInstance from '../lib/axios';


// 1. Import the FaEdit icon for the update button
import { FaArrowLeft, FaRegCalendarAlt, FaRegClock, FaTrash, FaEdit } from 'react-icons/fa';

function Diary_id() {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // This fetches the specific diary entry and remains unchanged.
  const {
    data: diary,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['diary', id],
    queryFn: async () => {
      const { data } = await axiosInstance.get(`/diary/${id}`);
      return data;
    },
    enabled: !!id,
  });

  
  const { mutate: deleteDiary, isLoading: isDeleting } = useMutation({
    mutationFn: async () => {
      await axiosInstance.delete(`/diary/delete/${id}`);
    },
    onSuccess: () => {
     
      queryClient.invalidateQueries({ queryKey: ['diaries'] });
      navigate('/diary');
    },
    onError: (error) => {
      
      error.response?.data?.message 
    },
  });

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this memory? This action cannot be undone.')) {
      deleteDiary();
    }
  };

  
  const handleUpdate = () => {
    
    navigate(`/diary/update/${id}`);
  };

  if (isLoading) {
    return <div className="flex justify-center items-center min-h-screen">Loading your memory...</div>;
  }

  if (isError) {
    return <div className="flex justify-center items-center min-h-screen text-red-500">Error: {error.message}</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-purple-100 p-4 sm:p-6 md:p-8">
      <div className="max-w-4xl mx-auto bg-white/90 backdrop-blur-md rounded-2xl shadow-lg p-6 sm:p-8">
        <Link to="/diary" className="inline-flex items-center text-purple-600 hover:text-purple-800 mb-6 transition-colors">
          <FaArrowLeft className="mr-2" />
          Back to all entries
        </Link>

        <div className="border-b border-gray-200 pb-4 mb-6">
          <div className="flex justify-between items-start">
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 break-words pr-4">
              {diary.title}
            </h1>
            
          
            <div className="flex space-x-2 flex-shrink-0">
              <button
                onClick={handleUpdate}
                className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-100 rounded-full transition-colors"
                title="Edit entry"
              >
                <FaEdit size={20} />
              </button>
              <button
                onClick={handleDelete}
                disabled={isDeleting}
                className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-100 rounded-full transition-colors disabled:opacity-50"
                title="Delete entry"
              >
                {isDeleting ? <div className="w-5 h-5 border-t-2 border-gray-500 rounded-full animate-spin" /> : <FaTrash size={20} />}
              </button>
            </div>
          </div>
          <div className="flex items-center text-gray-500 mt-3 space-x-4 text-sm">
            <div className="flex items-center"><FaRegCalendarAlt className="mr-2" /><span>{new Date(diary.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span></div>
            <div className="flex items-center"><FaRegClock className="mr-2" /><span>{new Date(diary.createdAt).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}</span></div>
          </div>
        </div>

        <div
          className="prose prose-lg max-w-none text-gray-700 leading-relaxed"
          dangerouslySetInnerHTML={{ __html: diary.content }}
        />
      </div>
    </div>
  );
}

export default Diary_id;
