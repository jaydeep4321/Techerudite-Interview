import { joiResolver } from '@hookform/resolvers/joi';
import { useForm } from 'react-hook-form';
import { otpValidationSchema } from '../../../validators/authValidator';
import { useMutation } from '@tanstack/react-query';
import { AUTH_SERVICES } from '../../../services/auth.service';
import { useNavigate } from 'react-router';
import { toast } from 'sonner';

const useEmailVerify = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: joiResolver(otpValidationSchema),
  });
  const navigate = useNavigate();

  const verifyOtpMutation = useMutation({
    mutationFn: AUTH_SERVICES.verifyOtp,
    onSuccess: (data) => {
      navigate('/login');
      toast.success('Email verified successfully');
    },
    onError: ({ response }: any) => {
      reset();
      toast.error(response.data.message);
    },
  });

  const onSubmit = (data: any) => {
    verifyOtpMutation.mutate({
      ...data,
      userId: Number(localStorage.getItem('userId')),
    });
  };
  return {
    onSubmit,
    register,
    handleSubmit,
    errors,
    verifyOtpMutation,
  };
};

export default useEmailVerify;
