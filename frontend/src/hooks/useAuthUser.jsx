
import { useQuery } from '@tanstack/react-query';
import axiosInstance from '../lib/axios';



const fetchAuthUser = async () => {
  const response = await axiosInstance.get('/auth/me');
  return response.data;
};


export const useAuthUser = () => {

const{ data, isLoading, isError, error}=useQuery({
    queryKey:["authUser"],
    queryFn:fetchAuthUser,
    retry:false
})
 return { data, isLoading, isError, error}
};
