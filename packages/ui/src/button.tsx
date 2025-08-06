import React from 'react';
import { DivideIcon as LucideIcon } from 'lucide-react';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'visible';
  size?: 'sm' | 'md' | 'lg';
  icon?: typeof LucideIcon;
  iconPosition?: 'left' | 'right';
  className?: string;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
}

const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  icon: Icon,
  iconPosition = 'right',
  className = '',
  onClick,
  type = 'button',
  disabled = false,
}:ButtonProps) => {
  const baseClasses = 'inline-flex items-center justify-center px-4 font-semibold rounded-lg transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100';
  
  const variantClasses = {
    primary: 'bg-purple-600 text-white hover:bg-purple-500 shadow-lg hover:shadow-xl',
    secondary: 'bg-white text-purple-600 hover:bg-gray-50 shadow-lg hover:shadow-xl',
    outline: 'border-2 border-red-100 text-gray-300 hover:border-purple-400 hover:text-purple-400 bg-transparent',
    visible:'border-2 border-black text-white hover:bg-black'
  };
  
  const sizeClasses = {
    sm: 'px-4 py-2 text-sm gap-2',
    md: 'px-6 py-3 text-base gap-2',
    lg: 'px-8 py-4 text-lg gap-2',
  };
  
  const classes = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`;
  
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={classes}
    >
      {Icon && iconPosition === 'left' && (
        <Icon className={`${size === 'sm' ? 'w-4 h-4' : size === 'lg' ? 'w-6 h-6' : 'w-5 h-5'} group-hover:translate-x-1 transition-transform`} />
      )}
      {children}
      {Icon && iconPosition === 'right' && (
        <Icon className={`${size === 'sm' ? 'w-4 h-4' : size === 'lg' ? 'w-6 h-6' : 'w-5 h-5'} group-hover:translate-x-1 transition-transform`} />
      )}
    </button>
  );
};

export default Button;