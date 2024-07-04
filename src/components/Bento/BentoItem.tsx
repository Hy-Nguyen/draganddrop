import { cn } from '@/lib/utils';
import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';

interface BentoItemProps {
  id: string;
  children: React.ReactNode;
  className?: string;
}

export default function BentoItem({ id, children, className }: BentoItemProps) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id,
  });
  const style = {
    // Outputs `translate3d(x, y, 0)`
    transform: CSS.Translate.toString(transform),
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className={cn(
        'bg-slate-wd border-green-wd/20 col-span-1 row-span-1 flex h-full min-h-[200px] w-full items-center justify-center rounded-2xl border p-2',
        className
      )}
    >
      {children}
    </div>
  );
}
