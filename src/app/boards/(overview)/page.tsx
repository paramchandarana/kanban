import data from "../../lib/placeholder_data.json";
import Card from "@/app/ui/boards/card";

export default function Page() {
  const boards = data.boards;

  return (
    <main className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 px-4 py-8">
      {boards.map((board, i) => (
        <Card key={i} board={board} />
      ))}
    </main>
  );
}
