import React from 'react';
import { UseFormRegister, FieldErrors } from 'react-hook-form';

interface AuthFormFieldProps {
  name: string;
  type: string;
  placeholder: string;
  register: UseFormRegister<any>;
  error?: string;
  className?: string;
}

export function AuthFormField({
  name,
  type,
  placeholder,
  register,
  error,
  className = '',
}: AuthFormFieldProps) {
  return (
    <div>
      <label htmlFor={name} className="sr-only">{placeholder}</label>
      <input
        {...register(name)}
        type={type}
        className={`appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-gray-500 focus:border-gray-500 focus:z-10 sm:text-sm ${className}`}
        placeholder={placeholder}
      />
      {error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}
    </div>
  );
}