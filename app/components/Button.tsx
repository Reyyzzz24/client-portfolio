import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'activated' | 'outline';
  children: React.ReactNode;
}

const Button = ({
  variant = 'primary',
  children,
  className = '',
  ...props
}: ButtonProps) => {
  const baseStyles =
    'inline-flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium rounded-3xl transition-all duration-200 disabled:opacity-50 disabled:pointer-events-none';

  const variants = {
    primary:
      'bg-black text-white hover:bg-neutral-800 active:scale-[0.98]',

    outline:
      'border border-black bg-white text-neutral-900 hover:bg-neutral-50 active:scale-[0.98]',

    activated:
      'bg-emerald-50 text-emerald-700 border border-emerald-200 cursor-default',
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;