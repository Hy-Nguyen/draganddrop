import { cn } from '@/lib/utils';
import { useDroppable } from '@dnd-kit/core';

interface BentoContainerProps {
  id: string;
  children?: React.ReactNode;
  className?: string;
}

export default function BentoContainer({ id, children, className }: BentoContainerProps) {
  const { isOver, setNodeRef } = useDroppable({
    id,
  });
  return (
    <div
      ref={setNodeRef}
      className={cn(
        'bg-black-wd outline-green-wd grid h-full w-full grid-cols-12 grid-rows-9 items-center justify-center gap-4 rounded-2xl p-12 outline',
        className
      )}
    >
      {children}
    </div>
  );
}
