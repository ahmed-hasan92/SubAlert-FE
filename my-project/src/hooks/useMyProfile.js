import { useQuery } from '@tanstack/react-query';
import { myData } from '../api/auth';

const useMyProfile = () => {
  const {
    data: profile,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['MyProfileInfo'],
    queryFn: () => myData(),
  });

  return { profile, isLoading, isError };
};

export default useMyProfile;
