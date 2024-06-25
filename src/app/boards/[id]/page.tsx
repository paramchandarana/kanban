import { fetchProjects, fetchTasksByProject } from "../../lib/data";
import BoardContainer from "./boardContainer";

export default async function Page({ params }: { params: { id: string } }) {
  const boards = await fetchProjects();
  
  const { id } = params;

  // Convert id to integer to access the correct board index
  const boardId = parseInt(id, 10);
  const tasks = await fetchTasksByProject(boardId);

  // Ensure statuses is an array of unique statuses
  const statuses = tasks ? Array.from(new Set(tasks.map((task) => task.status))) : [];
  const boardIndex = boardId - 1;

  // Validate if boardIndex is a number and exists in data
  const board =
    !isNaN(boardIndex) && boards[boardIndex] ? boards[boardIndex] : null;

  if (!board) {
    return <div>Board not found</div>;
  }

  return <BoardContainer tasks={tasks} categories={statuses} />;
}
