"use client";

import CategoryCard from "@/app/ui/board/categoryCard";
import { DragDropContext } from "react-beautiful-dnd";
import { useState } from "react";

export default function BoardContainer({ tasks, categories }: any) {
  const [categoriesState, setCategoriesState] = useState(categories);

  const handleDragEnd = (result: any) => {
    const { destination, source, draggableId } = result;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const sourceCategory = categories[source.droppableId];
    const destinationCategory = categories[destination.droppableId];

    const newTaskIds = Array.from(sourceCategory.taskIds);
    newTaskIds.splice(source.index, 1);
    newTaskIds.splice(destination.index, 0, Number(draggableId));

    const updatedCategories = categories.map((category: any) => {
      if (category.category === sourceCategory.category) {
        return { ...category, taskIds: newTaskIds };
      }
      return category;
    });

    setCategoriesState(updatedCategories);
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <main className="flex space-x-6">
        {categoriesState.map((categoryState: any, i: number) => {
          const filteredTasks = tasks.filter(
            (task: any) => task.status === categoryState.category
          );

          const sortedTasks = filteredTasks.sort((taskA: any, taskB: any) => {
            const indexA = categoryState.taskIds.indexOf(taskA.task_id);
            const indexB = categoryState.taskIds.indexOf(taskB.task_id);
            return indexA - indexB;
          });

          return (
            <CategoryCard key={categoryState.category} category={categoryState.category} tasks={sortedTasks} index={i}/>
          );
        })}
      </main>
    </DragDropContext>
  );
}
