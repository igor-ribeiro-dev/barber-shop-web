import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'react-hot-toast';
import { useStore } from '../store/useStore';
import { Button } from '../components/ui/Button';
import { AuthLayout } from '../components/auth/AuthLayout';
import { AuthFormField } from '../components/auth/AuthForm';

const registerSchema = z.object({
  name: z.string().min(3, 'Nome deve ter no mínimo 3 caracteres'),
  email: z.string().email('E-mail inválido'),
  phone: z.string().min(11, 'Celular inválido').max(11, 'Celular inválido'),
  password: z.string().min(4, 'A senha deve ter no mínimo 4 caracteres'),
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: "As senhas não conferem",
  path: ["confirmPassword"],
});

type RegisterForm = z.infer<typeof registerSchema>;

export function Register() {
  const navigate = useNavigate();
  const register = useStore((state) => state.register);
  const [error, setError] = React.useState('');
  
  const { register: registerField, handleSubmit, formState: { errors, isSubmitting } } = useForm<RegisterForm>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterForm) => {
    try {
      setError('');
      await register({
        name: data.name,
        email: data.email,
        password: data.password,
        phone: data.phone,
      });
      toast.success('Cadastro realizado com sucesso!');
      navigate('/appointments');
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Erro ao realizar cadastro');
      }
    }
  };

  return (
    <AuthLayout title="Criar uma conta">
      <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
        <div className="rounded-md shadow-sm space-y-4">
          <AuthFormField
            name="name"
            type="text"
            placeholder="Nome completo"
            register={registerField}
            error={errors.name?.message}
          />

          <AuthFormField
            name="email"
            type="email"
            placeholder="E-mail"
            register={registerField}
            error={errors.email?.message}
          />

          <AuthFormField
            name="phone"
            type="tel"
            placeholder="Celular (apenas números)"
            register={registerField}
            error={errors.phone?.message}
          />
          
          <AuthFormField
            name="password"
            type="password"
            placeholder="Senha"
            register={registerField}
            error={errors.password?.message}
          />

          <AuthFormField
            name="confirmPassword"
            type="password"
            placeholder="Confirmar senha"
            register={registerField}
            error={errors.confirmPassword?.message}
          />
        </div>

        {error && (
          <div className="text-sm text-red-600 text-center">
            {error}
          </div>
        )}

        <div className="flex flex-col space-y-4">
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full"
          >
            {isSubmitting ? 'Cadastrando...' : 'Cadastrar'}
          </Button>

          <p className="text-center text-sm text-gray-600">
            Já tem uma conta?{' '}
            <button
              type="button"
              onClick={() => navigate('/login')}
              className="font-medium text-gray-900 hover:text-gray-700"
            >
              Faça login
            </button>
          </p>
        </div>
      </form>
    </AuthLayout>
  );
}