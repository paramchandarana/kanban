import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";
import { db } from "../../../prisma/src/db";

export type State = {
  errors?: {
    categoryId?: string[];
    title?: string[];
    description?: string[];
    priority?: string[];
    status?: string[];
  };
  message?: string | null;
};

// Projects Table
export async function createProject(title: string, description: string) {
  try {
    await sql`
      INSERT INTO projects (title, description)
      VALUES (${title}, ${description})
    `;
    revalidatePath("/boards");
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to create project.");
  }
}

export async function updateProject(
  id: string,
  title: string,
  description: string
) {
  try {
    await sql`
      UPDATE projects
      SET title = ${title}, description = ${description}
      WHERE project_id = ${id}
    `;
    revalidatePath("/projects");
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to update project.");
  }
}

export async function deleteProject(id: string) {
  try {
    await sql`DELETE FROM projects WHERE project_id = ${id}`;
    revalidatePath("/projects");
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to delete project.");
  }
}

// Tasks Table
export async function createTask(
  categoryId: string,
  title: string,
  dueDate: string,
  status: string,
  priority: string,
  description: string
) {
  try {
    await sql`
      INSERT INTO tasks (category_id, title, due_date, status, priority, description)
      VALUES (${categoryId}, ${title}, ${dueDate}, ${status}, ${priority}, ${description})
    `;
    revalidatePath("/boards");
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to create task.");
  }
}

export async function updateTaskCategory(task_id: number, category: string) {
  try {
    const updatedTask = await db.task.update({
      where: {
        task_id: task_id
      },
      data: {
        status: category,
      },
    })
    return updatedTask;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to update task category");
  }
}

export async function deleteTask(id: string) {
  try {
    await sql`DELETE FROM tasks WHERE task_id = ${id}`;
    revalidatePath("/boards");
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to delete task.");
  }
}

export async function updateTaskOrder(
  project_id: number,
  category: string,
  taskIds: string,
  newTaskIds: string
) {
  try {
    const updatedTaskOrder = await db.taskOrder.update({
      where: {
        project_id: project_id,
        category: category,
        taskIds: taskIds
      },
      data: {
        taskIds: newTaskIds,
      },
    });
    return updatedTaskOrder;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to reorder tasks.");
  }
}
