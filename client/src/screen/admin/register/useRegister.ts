import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import { registerSchema } from '../../../validators/authValidator';
import { useMutation } from '@tanstack/react-query';
import { AUTH_SERVICES } from '../../../services/auth.service';
import { useNavigate } from 'react-router';
import { toast } from 'sonner';

const useRegister = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: joiResolver(registerSchema),
  });

  const navigate = useNavigate();

  const registerMutation = useMutation({
    mutationFn: AUTH_SERVICES.adminRgister,
    onSuccess: (data) => {
      toast.success(data.data.message);
      // if (data?.data?.data?.userId) {
      localStorage.setItem('userId', String(data?.data?.userId));
      // }
      navigate('/verify-otp');
    },
    onError: ({ response }: any) => {
      reset();
      toast.error(response.data.message);
    },
  });

  const onSubmit = (data: any) => {
    registerMutation.mutate(data);
  };

  return { onSubmit, register, handleSubmit, errors };
};

export default useRegister;
