import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../lib/axios';


const createDiaryEntry = async (newEntry) => {
  const res = await axiosInstance.post('/diary/new', newEntry);
  return res.data;
};

export const useCreateDiary = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: createDiaryEntry,
    onSuccess: () => {
      
      queryClient.invalidateQueries({ queryKey: ['diaries'] });

     
      navigate('/diary');
    },
    onError: (error) => {
      
      console.error("Failed to create diary entry:", error);
      alert("Oops! We couldn't save your entry. Please make sure you've written some content.");
    },
  });
};
