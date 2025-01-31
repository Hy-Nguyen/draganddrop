import React from 'react';
import { useDroppable } from '@dnd-kit/core';

export default function Droppable(props: any) {
  const { isOver, setNodeRef } = useDroppable({
    id: props.id,
  });
  const style = {
    opacity: isOver ? 1 : 0.5,
  };

  return (
    <div ref={setNodeRef} style={style} className="flex h-[200px] w-[500px] items-center justify-center border">
      {props.children}
    </div>
  );
}
