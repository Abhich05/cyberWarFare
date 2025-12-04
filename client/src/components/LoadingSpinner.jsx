import { cn } from '../utils';
import { Loader2 } from 'lucide-react';

const LoadingSpinner = ({ size = 'medium', className, text }) => {
  const sizeClasses = {
    small: 'w-4 h-4',
    medium: 'w-6 h-6',
    large: 'w-10 h-10',
  };

  return (
    <div className={cn('flex flex-col items-center justify-center gap-3', className)}>
      <Loader2 className={cn('animate-spin text-primary-500', sizeClasses[size])} />
      {text && <span className="text-dark-400 text-sm animate-pulse">{text}</span>}
    </div>
  );
};

export default LoadingSpinner;
