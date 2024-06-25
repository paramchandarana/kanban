import CategoryCard from "@/app/ui/board/categoryCard";

export default function ProjectContainer({ tasks, categories }: any) {
  return (
    <div className="flex space-x-6 overflow-x-auto">
      {categories.map((category: any, i: number) => {
        const filteredTasks = tasks.filter(
          (task: any) => task.status === category
        );
        return (
          <CategoryCard key={i} category={category} tasks={filteredTasks} />
        );
      })}
    </div>
  );
}
