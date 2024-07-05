import React, { useState } from 'react';
import { DndContext } from '@dnd-kit/core';
import Draggable from './Draggable';
import Droppable from './Droppable';

export default function Example() {
  const [parent, setParent] = useState(null);
  const draggable = <Draggable id="draggable">Go ahead, drag me.</Draggable>;

  return (
    <div className="flex w-fit flex-col gap-10 rounded-xl border border-green-wd">
      <DndContext onDragEnd={handleDragEnd}>
        {!parent ? draggable : null}
        <Droppable id="droppable">{parent === 'droppable' ? draggable : 'Drop here'}</Droppable>
      </DndContext>
    </div>
  );

  function handleDragEnd({ over }: any) {
    setParent(over ? over.id : null);
  }
}
