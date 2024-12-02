import { useQuery } from '@tanstack/react-query';
import { getNotifications } from '../api/notification';

const useNotification = () => {
  const { data: myNotifications, isLoading } = useQuery({
    queryKey: ['ALL_NOTIFICATIONS'],
    queryFn: () => getNotifications(),
  });

  return { myNotifications, isLoading };
};

export default useNotification;
