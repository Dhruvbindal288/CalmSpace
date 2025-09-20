import { useQuery } from '@tanstack/react-query';
import axiosInstance from '../lib/axios';

const fetchDiaries = async () => {
  const res = await axiosInstance.get('/diary/diaries');
  return res.data;
};

export const useDiaries = () => {
  return useQuery({
    queryKey: ['diaries'],
    queryFn: fetchDiaries,
    retry: false, 
  });
};
