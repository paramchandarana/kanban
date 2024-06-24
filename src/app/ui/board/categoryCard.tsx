'use client';

import Link from 'next/link';
import TaskCard from './taskCard';
import { usePathname } from 'next/navigation';


function CategoryCard({ category }: { category: any }) {
  const pathname = usePathname();
  const handleAddTask = () => {
    // Implement your logic to add a new task
    console.log('Adding new task...');
  };

  return (
    <div className="flex flex-col bg-white border border-gray-200 rounded-lg shadow-sm p-4 w-72">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">{category.title}</h3>
      <div className="space-y-4 flex-grow overflow-y-auto">
        {category.tasks.map((task: any) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </div>
      <Link
        className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
        href={`${pathname}/add-task`}
      >
        Add New Task
      </Link>
    </div>
  );
}

export default CategoryCard;
