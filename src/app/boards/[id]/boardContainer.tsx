"use client";

import CategoryCard from "@/app/ui/board/categoryCard";
import { DragDropContext } from "react-beautiful-dnd";
import { useState } from "react";

export default function BoardContainer({
  projectId,
  tasks,
  categories,
  onTaskReorder,
  onCategoryUpdate
}: any) {
  const [categoriesState, setCategoriesState] = useState(categories);
  const [previousCategoriesState, setPreviousCategoriesState] = useState(categories);

  function findExtraElement(a: any, b: any) {
    // Convert array b to a Set for fast lookup
    const setA = new Set(a);
  
    // Find the extra element in b that is not in a
    const extraElement = b.find((element: any) => !setA.has(element));
  
    return extraElement;
  }

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

    if (sourceCategory == destinationCategory) {
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
      
      onTaskReorder(
        projectId,
        sourceCategory.category,
        sourceCategory.taskIds,
        newTaskIds
      );
    } else {
      const newSourceTaskIds = Array.from(sourceCategory.taskIds);
      newSourceTaskIds.splice(source.index, 1);
      const newDestinationTaskIds = Array.from(destinationCategory.taskIds);
      newDestinationTaskIds.splice(destination.index, 0, Number(draggableId));
      const updatedCategories = categories.map((category: any) => {
        if (category.category === sourceCategory.category) {
          return { ...category, taskIds: newSourceTaskIds };
        }
        if (category.category === sourceCategory.category) {
          return { ...category, taskIds: newDestinationTaskIds };
        }
        return category;
      });
      
      setCategoriesState(updatedCategories);
      
      onTaskReorder(
        projectId,
        sourceCategory.category,
        sourceCategory.taskIds,
        newSourceTaskIds
      );

      onTaskReorder(
        projectId,
        destinationCategory.category,
        destinationCategory.taskIds,
        newDestinationTaskIds
      );

      // console.log("current=",updatedCategories.find((category: any) => category.category === destinationCategory.category).taskIds);
      console.log("prev=",newDestinationTaskIds);

      const taskIdToUpdate = findExtraElement(previousCategoriesState.find((category: any) => category.category === destinationCategory.category).taskIds, newDestinationTaskIds);
      console.log("task id to update=", taskIdToUpdate);
      onCategoryUpdate(
        taskIdToUpdate,
        destinationCategory.category
      )
    }
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <main className="flex space-x-6">
        {categoriesState.map((categoryState: any, i: number) => {
          // Filter tasks for the current category
          const filteredTasks = tasks.filter(
            (task: any) => task.status === categoryState.category
          );
          console.log("filtered=",filteredTasks)
          console.log("categorY state=",categoryState);
          const sortedTasks = categoryState.taskIds.map((taskId: number) =>
            filteredTasks.find((task: any) => task.task_id == taskId)
          );
          console.log("sorted=", sortedTasks)
          return (
            <CategoryCard
              key={categoryState.category}
              category={categoryState.category}
              tasks={sortedTasks}
              index={i}
            />
          );
        })}
      </main>
    </DragDropContext>
  );
}
