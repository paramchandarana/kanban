import Link from "next/link";
import TaskCard from "./taskCard";
import { Droppable } from "react-beautiful-dnd";

async function CategoryCard({ category, tasks, index }: any) {
  return (
    <div className="flex flex-col bg-white border border-gray-200 rounded-lg shadow-sm p-4 w-72">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">{category}</h3>
      <Droppable droppableId={`${index}`}>
      {(provided) => (
          <div
            className="space-y-4 flex-grow overflow-y-auto"
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
        {tasks.map((task: any, i: number) => (
          <TaskCard key={task.task_id} task={task} index={i}/>
        ))}
      </div>
      )}
      </Droppable>
      <Link
        href={`/boards/${category.project_id}/add-task`}
        className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
        passHref
      >
        Add New Task
      </Link>
    </div>
  );
}

export default CategoryCard;
