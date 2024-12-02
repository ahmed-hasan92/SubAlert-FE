import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addSubscription } from '../api/subscription';
import { toast } from 'react-hot-toast';

const useSubscription = () => {
  const query = useQueryClient();

  const { mutate: addNewSubscription } = useMutation({
    mutationKey: ['ADD_NEW_SUB'],
    mutationFn: ({ name, image, startDate, expiryDate, amount }) =>
      addSubscription(name, image, startDate, expiryDate, amount),
    onSuccess: (data) => {
      toast.success(`${data}`);
      query.invalidateQueries('ALL_NOTIFICATIONS');
    },
    onError: (error) => {
      toast.error(`${error.response.data}`);
    },
  });

  return { addNewSubscription };
};

export default useSubscription;
