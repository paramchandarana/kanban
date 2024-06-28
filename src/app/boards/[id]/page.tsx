import {
  fetchProjects,
  fetchTaskOrderByProject,
  fetchTasksByProject,
} from "../../lib/data";
import BoardContainer from "./boardContainer";
import { updateTaskOrder, updateTaskCategory } from "@/app/lib/actions";

export default async function Page({ params }: { params: { id: string } }) {
  const boards = await fetchProjects();

  const { id } = params;

  // Convert id to integer to access the correct board index
  const boardId = parseInt(id, 10);
  const tasks = await fetchTasksByProject(boardId);
  const taskIdsAll = await fetchTaskOrderByProject(boardId);
  let categories: any = [];
  // Extract unique statuses
  if (taskIdsAll) {

    taskIdsAll.forEach((taskIdItem) => {
      const taskIds = taskIdItem.taskIds.split(",").map(Number);

      const task = {
        category: taskIdItem.category,
        taskIds: taskIds,
      };

      categories.push(task);
    });
  } else {
    const uniqueStatuses = Array.from(
      new Set(tasks.map((task) => task.status))
    );
    uniqueStatuses.map((status) => {
      const categorizedTasks = tasks.filter((task) => task.status === status);
      const taskIds = categorizedTasks.map((task) => task.task_id);
      let category = { category: status, taskIds: taskIds };
      categories.push(category);
    });
  }

  const boardIndex = boardId - 1;

  // Validate if boardIndex is a number and exists in data
  const board =
    !isNaN(boardIndex) && boards[boardIndex] ? boards[boardIndex] : null;

  if (!board) {
    return <div>Board not found</div>;
  }

  return (
    <BoardContainer
      projectId={boardId}
      tasks={tasks}
      categories={categories}
      onTaskReorder={async (
        projectId: number,
        category: string,
        taskIds: any,
        newTaskIds: any
      ) => {
        "use server";
        updateTaskOrder(
          projectId,
          category,
          taskIds.toString(),
          newTaskIds.toString()
        );
      }}

      onCategoryUpdate={async (
        taskId: number,
        category: string
      ) => {
        "use server";
        updateTaskCategory(
          taskId,
          category
        );
      }}
    />
  );
}
