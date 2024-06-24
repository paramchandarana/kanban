import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

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
    revalidatePath('/projects');
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to create project.');
  }
}

export async function updateProject(id: string, title: string, description: string) {
  try {
    await sql`
      UPDATE projects
      SET title = ${title}, description = ${description}
      WHERE project_id = ${id}
    `;
    revalidatePath('/projects');
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to update project.');
  }
}

export async function deleteProject(id: string) {
  try {
    await sql`DELETE FROM projects WHERE project_id = ${id}`;
    revalidatePath('/projects');
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to delete project.');
  }
}

// Categories Table
export async function createCategory(projectId: string, title: string) {
  try {
    await sql`
      INSERT INTO categories (project_id, title)
      VALUES (${projectId}, ${title})
    `;
    revalidatePath('/projects');
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to create category.');
  }
}

export async function updateCategory(id: string, title: string) {
  try {
    await sql`
      UPDATE categories
      SET title = ${title}
      WHERE category_id = ${id}
    `;
    revalidatePath('/projects');
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to update category.');
  }
}

export async function deleteCategory(id: string) {
  try {
    await sql`DELETE FROM categories WHERE category_id = ${id}`;
    revalidatePath('/projects');
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to delete category.');
  }
}

// Tasks Table
export async function createTask(categoryId: string, title: string, dueDate: string, status: string, priority: string, description: string) {
  try {
    await sql`
      INSERT INTO tasks (category_id, title, due_date, status, priority, description)
      VALUES (${categoryId}, ${title}, ${dueDate}, ${status}, ${priority}, ${description})
    `;
    revalidatePath('/projects');
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to create task.');
  }
}

export async function updateTask(id: string, title: string, dueDate: string, status: string, priority: string, description: string) {
  try {
    await sql`
      UPDATE tasks
      SET title = ${title}, due_date = ${dueDate}, status = ${status}, priority = ${priority}, description = ${description}
      WHERE task_id = ${id}
    `;
    revalidatePath('/projects');
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to update task.');
  }
}

export async function deleteTask(id: string) {
  try {
    await sql`DELETE FROM tasks WHERE task_id = ${id}`;
    revalidatePath('/projects');
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to delete task.');
  }
}
