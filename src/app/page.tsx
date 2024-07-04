'use client';

import BentoContainer from '@/components/Bento/BentoContainer';
import BentoItem from '@/components/Bento/BentoItem';
import { DndContext, DragEndEvent } from '@dnd-kit/core';
import { useState, useEffect } from 'react';

interface BentoItemData {
  id: string;
  content: string;
  className: string;
}

export default function Home() {
  const [items, setItems] = useState<BentoItemData[]>([
    { id: 'item1', content: 'hello 1', className: 'col-span-6 row-span-1' },
    { id: 'item2', content: 'hello 2', className: 'col-span-6 row-span-1' },
    { id: 'item3', content: 'hello 3', className: 'col-span-6 row-span-1' },
    { id: 'item4', content: 'hello 4', className: 'col-span-6 row-span-1' },
  ]);
  const [containerItems, setContainerItems] = useState<BentoItemData[]>([]);

  useEffect(() => {
    console.log('Items:', items);
    console.log('Container Items:', containerItems);
  }, [items, containerItems]);

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    console.log('Drag end event:', event);

    if (over) {
      if (over.id === 'container') {
        // Dragging into the container
        const draggedItem = items.find((item) => item.id === active.id);
        if (draggedItem) {
          setItems((currentItems) => currentItems.filter((item) => item.id !== active.id));
          setContainerItems((currentItems) => [...currentItems, draggedItem]);
        }
      } else if (over.id === 'outside') {
        // Dragging out of the container
        const draggedItem = containerItems.find((item) => item.id === active.id);
        if (draggedItem) {
          setContainerItems((currentItems) => currentItems.filter((item) => item.id !== active.id));
          setItems((currentItems) => [...currentItems, draggedItem]);
        }
      }
    }
  }

  return (
    <main className="bg-black-wd flex min-h-screen flex-col items-center justify-start gap-24 p-24">
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-green-wd text-9xl font-bold">hello</h1>
      </div>
      <DndContext onDragEnd={handleDragEnd}>
        <BentoContainer id="outside" className="text-green-wd w-full grid-rows-2">
          {items.map((item) => (
            <BentoItem key={item.id} id={item.id} className={item.className}>
              <h1>{item.content}</h1>
            </BentoItem>
          ))}
        </BentoContainer>
        <BentoContainer id="container" className="text-green-wd w-full grid-rows-2">
          {containerItems.map((item) => (
            <BentoItem key={item.id} id={item.id} className={item.className}>
              <h1>{item.content}</h1>
            </BentoItem>
          ))}
        </BentoContainer>
      </DndContext>
    </main>
  );
}
