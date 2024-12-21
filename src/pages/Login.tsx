import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useStore } from '../store/useStore';
import { Button } from '../components/ui/Button';
import { AuthLayout } from '../components/auth/AuthLayout';
import { AuthFormField } from '../components/auth/AuthForm';

const loginSchema = z.object({
  email: z.string().email('E-mail inválido'),
  password: z.string().min(4, 'A senha deve ter no mínimo 4 caracteres'),
});

type LoginForm = z.infer<typeof loginSchema>;

export function Login() {
  const navigate = useNavigate();
  const login = useStore((state) => state.login);
  const [error, setError] = React.useState('');
  
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginForm) => {
    try {
      setError('');
      await login(data.email, data.password);
      navigate('/appointments');
    } catch (err) {
      setError('Credenciais inválidas');
    }
  };

  return (
    <AuthLayout title="Entre na sua conta">
      <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
        <div className="rounded-md shadow-sm space-y-4">
          <AuthFormField
            name="email"
            type="email"
            placeholder="E-mail"
            register={register}
            error={errors.email?.message}
          />
          
          <AuthFormField
            name="password"
            type="password"
            placeholder="Senha"
            register={register}
            error={errors.password?.message}
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
            {isSubmitting ? 'Entrando...' : 'Entrar'}
          </Button>

          <p className="text-center text-sm text-gray-600">
            Não tem uma conta?{' '}
            <button
              type="button"
              onClick={() => navigate('/register')}
              className="font-medium text-gray-900 hover:text-gray-700"
            >
              Cadastre-se
            </button>
          </p>
        </div>
      </form>
    </AuthLayout>
  );
}