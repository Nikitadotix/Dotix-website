import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { cn } from '../../lib/utils.js';

export function Button({ children, href, variant = 'primary', className, ...props }) {
  const baseStyles = 'group inline-flex items-center justify-center gap-2 rounded-full font-medium transition-all duration-200 motion-safe:hover:-translate-y-0.5 motion-safe:active:translate-y-0 motion-safe:active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-background-primary focus:ring-accent';
  
  const variants = {
    primary: 'bg-white text-background-primary hover:bg-gray-100 px-6 py-3',
    secondary: 'bg-transparent border border-border text-white hover:border-accent hover:text-accent px-6 py-3',
    accent: 'bg-accent text-white hover:bg-accent-hover px-6 py-3',
  };

  const buttonContent = (
    <>
      {children}
      {variant === 'primary' && <ChevronRight className="w-4 h-4 transition-transform duration-200 motion-safe:group-hover:translate-x-0.5" />}
    </>
  );

  if (href) {
    return (
      <Link 
        href={href} 
        className={cn(baseStyles, variants[variant], variant === 'primary' && 'site-primary-button', className)}
        {...props}
      >
        {buttonContent}
      </Link>
    );
  }

  return (
    <button 
      className={cn(baseStyles, variants[variant], variant === 'primary' && 'site-primary-button', className)}
      {...props}
    >
      {buttonContent}
    </button>
  );
}
