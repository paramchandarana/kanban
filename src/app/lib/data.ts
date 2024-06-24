import { sql } from "@vercel/postgres";

// Function to fetch all projects
export async function fetchProjects() {
  try {
    const data = await sql`
      SELECT * FROM projects
    `;
    return data.rows;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch projects.");
  }
}

// Function to fetch categories for a given project_id
export async function fetchCategoriesByProject(project_id: any) {
  try {
    const data = await sql`
      SELECT * FROM categories
      WHERE project_id = ${project_id}
    `;
    return data.rows;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch categories.");
  }
}

// Function to fetch tasks for a given category_id
export async function fetchTasksByCategory(category_id: any) {
  try {
    const data = await sql`
      SELECT * FROM tasks
      WHERE category_id = ${category_id}
    `;
    return data.rows;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch tasks.");
  }
}
