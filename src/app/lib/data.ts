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

// Function to fetch tasks for a given category_id
export async function fetchTasksByProject(project_id: any) {
  try {
    const data = await sql`
      SELECT * FROM tasks
      WHERE project_id = ${project_id}
    `;
    return data.rows;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch tasks.");
  }
}
