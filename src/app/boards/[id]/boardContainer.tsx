"use client";

import CategoryCard from "@/app/ui/board/categoryCard";
import { DragDropContext } from "react-beautiful-dnd";
import { useEffect, useState } from "react";
import axios from "axios";
import { fetchTasksByProject } from "@/app/lib/data";

export default function BoardContainer({
  projectId,
  tasks,
  categories,
  onTaskReorder,
  onCategoryUpdate,
}:
any) {
  const [categoriesState, setCategoriesState] = useState(categories);
  const [previousCategoriesState, setPreviousCategoriesState] =
    useState(categories);
  // const [tasks, setTasks] = useState(null);
  // const fetchTasks = async () => await fetchTasksByProject(projectId);
  // setTasks
  // console.log(tasks);
  // const [tasksFetched, setTasksFetched] = useState(false);
  // useEffect(() => {
  //   const fetchTasks = async () => {
  //     try {
  //       const response = await axios.get("http://localhost:3000/api/tasks");
  //       const foo = response.data;
  //       setTasks(foo);
  //       setTasksFetched(true);
  //     } catch (error) {
  //       console.error("Error fetching tasks:", error);
  //       setTasksFetched(true);
  //     }
  //   };
  //   fetchTasks();
  // }, [tasksFetched]);
  // console.log("fetched=", tasks);

  console.log("categoriesState =", categoriesState);
  function findExtraElement(a: any, b: any) {
    // Convert array b to a Set for fast lookup
    const setA = new Set(a);

    // Find the extra element in b that is not in a
    const extraElement = b.find((element: any) => !setA.has(element));

    return extraElement;
  }

  const handleDragEnd = (result: any) => {
    // setTasksFetched(false);

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
        if (category.category === destinationCategory.category) {
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
      // const tasks = fetchTasks(projectId)
      // console.log("current=",updatedCategories.find((category: any) => category.category === destinationCategory.category).taskIds);

      const taskIdToUpdate = findExtraElement(
        previousCategoriesState.find(
          (category: any) => category.category === destinationCategory.category
        ).taskIds,
        newDestinationTaskIds
      );
      onCategoryUpdate(taskIdToUpdate, destinationCategory.category);
    }
  };
  // console.log("checking changes =", categoriesState)
  // if (tasksFetched) {
    return (
      <DragDropContext onDragEnd={handleDragEnd}>
        <main className="flex space-x-6">
          {categoriesState.map((categoryState: any, i: number) => {
            // Filter tasks for the current category
            console.log("tasks =", tasks);
            const filteredTasks = tasks.filter(
              (task: any) => task.status === categoryState.category
            );
            const sortedTasks = categoryState.taskIds.map((taskId: number) =>
              filteredTasks.find((task: any) => task.task_id == taskId)
            );
            console.log("sorted =", filteredTasks, sortedTasks);
            return (
              <CategoryCard
                key={categoryState.category}
                category={categoryState.category}
                tasks={sortedTasks}
                projectId={projectId}
                index={i}
              />
            );
          })}
        </main>
      </DragDropContext>
    );
  // } else {
  //   return <>Loading</>;
  // }
}
