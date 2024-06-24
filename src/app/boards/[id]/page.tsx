import CategoryCard from "@/app/ui/board/categoryCard";
import data from "../../lib/placeholder_data.json";

export default function Page({ params }: { params: { id: string } }) {
  const { id } = params;

  // Convert id to integer to access the correct board index
  const boardId = parseInt(id, 10);
  const boardIndex = boardId - 1;

  // Validate if boardIndex is a number and exists in data
  const board =
    !isNaN(boardIndex) && data.boards[boardIndex]
      ? data.boards[boardIndex]
      : null;

  if (!board) {
    return <div>Board not found</div>;
  }

  return (
    <div className="flex space-x-6 overflow-x-auto">
      {board.categories.map((category: any) => (
        <CategoryCard key={category.id} category={category} />
      ))}
    </div>
  );
}
