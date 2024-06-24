import CategoryCard from "@/app/ui/board/categoryCard";
import { fetchProjects, fetchCategoriesByProject } from "../../lib/data";

export default async function Page({ params }: { params: { id: string } }) {
  const boards = await fetchProjects();

  const { id } = params;

  // Convert id to integer to access the correct board index
  const boardId = parseInt(id, 10);
  const categories = await fetchCategoriesByProject(boardId);
  const boardIndex = boardId - 1;

  // Validate if boardIndex is a number and exists in data
  const board =
    !isNaN(boardIndex) && boards[boardIndex]
      ? boards[boardIndex]
      : null;

  if (!board) {
    return <div>Board not found</div>;
  }

  return (
    <div className="flex space-x-6 overflow-x-auto">
      {categories.map((category: any) => (

        <CategoryCard key={category.category_id} category={category} />
      ))}
    </div>
  );
}
