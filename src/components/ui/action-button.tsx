import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Button } from './button';
import { ArrowRight } from 'lucide-react';

interface ActionButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  to: string;
  variant?: 'default' | 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  showArrow?: boolean;
}

export function ActionButton({
  to,
  children,
  className,
  variant = 'default',
  size = 'default',
  showArrow = true,
  ...props
}: ActionButtonProps) {
  return (
    <Button
      asChild
      variant={variant}
      size={size}
      className={cn('group', className)}
      {...props}
    >
      <Link to={to} className="flex items-center gap-2">
        {children}
        {showArrow && (
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        )}
      </Link>
    </Button>
  );
} 