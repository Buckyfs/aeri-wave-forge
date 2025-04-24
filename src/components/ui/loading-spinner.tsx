import { cn } from "@/lib/utils"

interface LoadingSpinnerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: 'sm' | 'default' | 'lg';
  variant?: 'default' | 'primary' | 'secondary';
  fullScreen?: boolean;
}

const LoadingSpinner = ({
  size = 'default',
  variant = 'default',
  fullScreen = false,
  className,
  ...props
}: LoadingSpinnerProps) => {
  const sizeClasses = {
    sm: 'h-4 w-4 border-2',
    default: 'h-8 w-8 border-3',
    lg: 'h-12 w-12 border-4',
  };

  const variantClasses = {
    default: 'border-gray-300 border-t-gray-800',
    primary: 'border-indigo-200 border-t-indigo-600',
    secondary: 'border-gray-200 border-t-gray-600',
  };

  const spinnerClasses = cn(
    'animate-spin rounded-full',
    sizeClasses[size],
    variantClasses[variant],
    className
  );

  const wrapperClasses = cn(
    'flex items-center justify-center',
    fullScreen && 'fixed inset-0 bg-white/80 backdrop-blur-sm z-50'
  );

  return (
    <div className={wrapperClasses} {...props}>
      <div className={spinnerClasses} />
    </div>
  );
};

export { LoadingSpinner }; 