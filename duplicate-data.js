#!/usr/bin/env node

const { Client } = require("pg");

// Database connection configuration
const dbConfig = {
  host: "localhost",
  port: 5438,
  user: "postgres",
  password: "SKNvFlyWebsite",
  database: "website",
};

async function duplicateData() {
  const client = new Client(dbConfig);

  try {
    await client.connect();
    console.log("Connected to database");

    // Get current count of blog posts
    const blogCountResult = await client.query("SELECT COUNT(*) FROM blog");
    const currentBlogCount = parseInt(blogCountResult.rows[0].count);
    console.log(`Current blog posts: ${currentBlogCount}`);

    // Get current count of projects
    const projectsCountResult = await client.query(
      "SELECT COUNT(*) FROM projects"
    );
    const currentProjectsCount = parseInt(projectsCountResult.rows[0].count);
    console.log(`Current projects: ${currentProjectsCount}`);

    if (currentBlogCount === 0 && currentProjectsCount === 0) {
      console.log(
        "No data found to duplicate. Please add some blog posts and projects first."
      );
      return;
    }

    // Duplicate blog posts
    if (currentBlogCount > 0) {
      console.log("Duplicating blog posts...");

      // Get all blog posts
      const blogPosts = await client.query(`
        SELECT * FROM blog 
        ORDER BY id
      `);

      // Duplicate blog posts
      for (const post of blogPosts.rows) {
        const { id, created_at, updated_at, slug, ...postData } = post;

        // Generate a unique slug for the duplicated post
        const newSlug = slug
          ? `${slug}-copy-${Date.now()}`
          : `copy-${Date.now()}`;

        const insertResult = await client.query(
          `
          INSERT INTO blog (${Object.keys(postData).join(", ")}, slug)
          VALUES (${Object.keys(postData)
            .map((_, i) => `$${i + 1}`)
            .join(", ")}, $${Object.keys(postData).length + 1})
          RETURNING id
        `,
          [...Object.values(postData), newSlug]
        );

        const newId = insertResult.rows[0].id;
        console.log(
          `Duplicated blog post ${id} -> ${newId} (slug: ${newSlug})`
        );
      }
    }

    // Duplicate projects
    if (currentProjectsCount > 0) {
      console.log("Duplicating projects...");

      // Get all projects
      const projects = await client.query(`
        SELECT * FROM projects 
        ORDER BY id
      `);

      // Duplicate projects
      for (const project of projects.rows) {
        const { id, created_at, updated_at, slug, ...projectData } = project;

        // Generate a unique slug for the duplicated project
        const newSlug = slug
          ? `${slug}-copy-${Date.now()}`
          : `copy-${Date.now()}`;

        const insertResult = await client.query(
          `
          INSERT INTO projects (${Object.keys(projectData).join(", ")}, slug)
          VALUES (${Object.keys(projectData)
            .map((_, i) => `$${i + 1}`)
            .join(", ")}, $${Object.keys(projectData).length + 1})
          RETURNING id
        `,
          [...Object.values(projectData), newSlug]
        );

        const newId = insertResult.rows[0].id;
        console.log(`Duplicated project ${id} -> ${newId} (slug: ${newSlug})`);
      }
    }

    // Get final counts
    const finalBlogCount = await client.query("SELECT COUNT(*) FROM blog");
    const finalProjectsCount = await client.query(
      "SELECT COUNT(*) FROM projects"
    );

    console.log(`\nData duplication completed!`);
    console.log(
      `Blog posts: ${currentBlogCount} -> ${finalBlogCount.rows[0].count}`
    );
    console.log(
      `Projects: ${currentProjectsCount} -> ${finalProjectsCount.rows[0].count}`
    );
  } catch (error) {
    console.error("Error duplicating data:", error);
  } finally {
    await client.end();
    console.log("Database connection closed");
  }
}

// Allow running multiple times
async function main() {
  const args = process.argv.slice(2);
  const times = args[0] ? parseInt(args[0]) : 1;

  console.log(`Running duplication ${times} time(s)...`);

  for (let i = 0; i < times; i++) {
    console.log(`\n--- Duplication round ${i + 1} ---`);
    await duplicateData();
  }
}

main().catch(console.error);
