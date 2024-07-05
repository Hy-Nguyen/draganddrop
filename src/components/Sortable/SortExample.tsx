import React, { useState } from 'react';
import {
  DndContext,
  DragEndEvent,
  PointerSensor,
  TouchSensor,
  KeyboardSensor,
  closestCorners,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { SortableContext, sortableKeyboardCoordinates } from '@dnd-kit/sortable';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { motion } from 'framer-motion';

interface ItemType {
  id: string;
  content: string;
}

export default function SortExample() {
  const initialItems = [
    { id: '1', content: 'hello 1' },
    { id: '2', content: 'hello 2' },
    { id: '3', content: 'hello 3' },
    { id: '4', content: 'hello 4' },
    { id: '5', content: 'hello 5' },
    { id: '6', content: 'hello 6' },
  ];

  const [items, setItems] = useState<ItemType[]>(initialItems);
  const [inEditMode, setInEditMode] = useState(false);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  function getTaskPosition(id: any) {
    return items.findIndex((item) => item.id === id);
  }

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (active.id === over?.id) {
      return;
    }

    setItems((items) => {
      const newItems = [...items];
      const activeIndex = getTaskPosition(active.id);
      const overIndex = getTaskPosition(over?.id || '');
      newItems.splice(overIndex, 0, newItems.splice(activeIndex, 1)[0]);
      return newItems;
    });
  }

  const toggleEdit = () => {
    setInEditMode(!inEditMode);
  };

  return (
    <>
      <div className="mb-4 flex w-1/3 items-center justify-center space-x-4">
        <motion.button
          onClick={() => setItems(initialItems)}
          className="w-1/2 rounded-lg border border-green-wd bg-black-wd p-2"
          whileHover={{ boxShadow: '0 0 15px 0 rgba(224, 255, 112, 0.5)' }}
        >
          Reset List
        </motion.button>
        <motion.button
          onClick={toggleEdit}
          className={`w-1/2 rounded-lg border p-2 ${
            inEditMode ? 'bg-green-wd text-black-wd' : 'border-green-wd bg-black-wd'
          }`}
          whileHover={{ boxShadow: '0 0 15px 0 rgba(255, 255, 255, 0.5)' }}
        >
          {inEditMode ? 'Save' : 'Edit'}
        </motion.button>
      </div>

      <DndContext sensors={sensors} collisionDetection={closestCorners} onDragEnd={handleDragEnd}>
        <Grid items={items} isDragEnabled={inEditMode} />
      </DndContext>
      <DndContext sensors={sensors} collisionDetection={closestCorners} onDragEnd={handleDragEnd}>
        <Row items={items} isDragEnabled={inEditMode} />
      </DndContext>
      <DndContext sensors={sensors} collisionDetection={closestCorners} onDragEnd={handleDragEnd}>
        <Col items={items} isDragEnabled={inEditMode} />
      </DndContext>
    </>
  );
}

function Row({ items, isDragEnabled }: { items: ItemType[]; isDragEnabled: boolean }) {
  return (
    <div className="flex w-1/3 flex-row items-center justify-center gap-4 rounded-lg border border-green-wd p-10">
      <SortableContext items={items}>
        {items.map((item) => (
          <Item key={item.id} id={item.id} content={item.content} isDragEnabled={isDragEnabled} />
        ))}
      </SortableContext>
    </div>
  );
}

function Col({ items, isDragEnabled }: { items: ItemType[]; isDragEnabled: boolean }) {
  return (
    <div className="flex w-1/3 flex-col items-center justify-center gap-4 rounded-lg border border-green-wd p-10">
      <SortableContext items={items}>
        {items.map((item) => (
          <Item key={item.id} id={item.id} content={item.content} isDragEnabled={isDragEnabled} />
        ))}
      </SortableContext>
    </div>
  );
}

function Grid({ items, isDragEnabled }: { items: ItemType[]; isDragEnabled: boolean }) {
  return (
    <div className="grid w-1/3 grid-cols-2 grid-rows-2 items-center justify-center gap-4 rounded-lg border border-green-wd p-10">
      <SortableContext items={items}>
        {items.map((item) => (
          <GridItem key={item.id} id={item.id} content={item.content} isDragEnabled={isDragEnabled} />
        ))}
      </SortableContext>
    </div>
  );
}

function Item({ id, content, isDragEnabled }: ItemType & { isDragEnabled: boolean }) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
    id: id,
    disabled: !isDragEnabled,
  });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition: transition ? 'all 0.15s ease-out' : 'none',
  };
  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={style}
      className={`flex w-1/2 items-center justify-center gap-4 rounded-lg border border-green-wd bg-black-wd p-4 ${
        isDragEnabled ? 'cursor-grab' : 'cursor-default'
      }`}
    >
      {content}
    </div>
  );
}

function GridItem({ id, content, isDragEnabled }: ItemType & { isDragEnabled: boolean }) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
    id: id,
    disabled: !isDragEnabled,
  });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition: transition ? 'all 0.15s ease-out' : 'none',
  };
  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={style}
      className={`col-span-1 row-span-1 flex items-center justify-center gap-4 rounded-lg border border-green-wd bg-black-wd p-4 ${
        isDragEnabled ? 'cursor-grab' : 'cursor-default'
      }`}
    >
      {content}
    </div>
  );
}
