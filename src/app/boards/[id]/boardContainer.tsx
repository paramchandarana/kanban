"use client";

import CategoryCard from "@/app/ui/board/categoryCard";
import { DragDropContext } from "react-beautiful-dnd";

export default function BoardContainer({ tasks, categories }: any) {
  const onDragEnd = (result: any) => {
    //TODO: reorder our column
  };
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <main className="flex space-x-6 overflow-x-auto">
        {categories.map((category: any, i: number) => {
          const filteredTasks = tasks.filter(
            (task: any) => task.status === category
          );
          return (
            <CategoryCard key={i} category={category} tasks={filteredTasks} index={i}/>
          );
        })}
      </main>
    </DragDropContext>
  );
}
