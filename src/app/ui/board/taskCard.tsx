import { Draggable } from "react-beautiful-dnd";

export default function TaskCard({ task, index }: any) {
  // Function to format date as needed
  const formatDate = (dateString: any) => {
    if (!dateString) {
      return 'No Due Date';
    }
    
    const dateObject = new Date(dateString);
    if (isNaN(dateObject.getTime())) {
      return 'Invalid Date';
    }
    
    const formattedDate = `${dateObject.getDate()}/${dateObject.getMonth() + 1}/${dateObject.getFullYear()}`;
    return formattedDate;
  };
  console.log(task)
  return (
    <Draggable draggableId={`${task.task_id}`} index={index}>
      {(provided) => (
        <div
          className="bg-white border border-gray-200 rounded-lg shadow-sm p-4 mb-4"
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <h3 className="text-lg font-semibold text-gray-900">{task.title}</h3>
          <p className="text-sm text-gray-600 mb-2">{task.description}</p>
          <div className="mb-2">
            <span className="text-xs text-gray-500">
              Due Date: {formatDate(task.duedate)}
            </span>
          </div>
          <div className="mb-2">
            <span
              className={`inline-block px-2 py-1 text-xs font-semibold text-white ${
                task.priority === "High"
                  ? "bg-red-500"
                  : task.priority === "Medium"
                  ? "bg-yellow-500"
                  : "bg-green-500"
              } rounded`}
            >
              {task.priority}
            </span>
          </div>
          <div>
            <span
              className={`inline-block px-2 py-1 text-xs font-semibold text-white ${
                task.status === "To Do"
                  ? "bg-blue-500"
                  : task.status === "In Progress"
                  ? "bg-yellow-500"
                  : "bg-green-500"
              } rounded`}
            >
              {task.status}
            </span>
          </div>
        </div>
      )}
    </Draggable>
  );
}
