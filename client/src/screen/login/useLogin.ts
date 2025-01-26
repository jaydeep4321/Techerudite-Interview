import { joiResolver } from '@hookform/resolvers/joi';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { loginSchema } from '../../validators/authValidator';
import { useMutation } from '@tanstack/react-query';
import { AUTH_SERVICES } from '../../services/auth.service';
import { toast } from 'sonner';

const useLogin = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: joiResolver(loginSchema),
  });

  const navigate = useNavigate();

  const loginMutation = useMutation({
    mutationFn: AUTH_SERVICES.adminLogin,
    onSuccess: (data) => {
      console.log(data?.data);
    },
    onError: ({ response }: any) => {
      reset();
      toast.error(response.data.message);
    },
  });

  const onSubmit = (data: any) => {
    loginMutation.mutate(data);
  };

  return { onSubmit, register, handleSubmit, errors };
};

export default useLogin;
