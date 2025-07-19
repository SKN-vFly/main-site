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

async function cleanupDuplicatedData() {
  const client = new Client(dbConfig);

  try {
    await client.connect();
    console.log("Connected to database");

    // Get current counts
    const blogCountResult = await client.query("SELECT COUNT(*) FROM blog");
    const projectsCountResult = await client.query(
      "SELECT COUNT(*) FROM projects"
    );

    console.log(`Current blog posts: ${blogCountResult.rows[0].count}`);
    console.log(`Current projects: ${projectsCountResult.rows[0].count}`);

    // Delete duplicated blog posts (keep only original ones - those without "copy" in slug)
    const deletedBlogsResult = await client.query(`
      DELETE FROM blog 
      WHERE slug LIKE '%copy%' 
      RETURNING id
    `);

    console.log(
      `Deleted ${deletedBlogsResult.rows.length} duplicated blog posts`
    );

    // Delete duplicated projects (keep only original ones - those without "copy" in slug)
    const deletedProjectsResult = await client.query(`
      DELETE FROM projects 
      WHERE slug LIKE '%copy%' 
      RETURNING id
    `);

    console.log(
      `Deleted ${deletedProjectsResult.rows.length} duplicated projects`
    );

    // Get final counts
    const finalBlogCount = await client.query("SELECT COUNT(*) FROM blog");
    const finalProjectsCount = await client.query(
      "SELECT COUNT(*) FROM projects"
    );

    console.log(`\nCleanup completed!`);
    console.log(
      `Blog posts: ${blogCountResult.rows[0].count} -> ${finalBlogCount.rows[0].count}`
    );
    console.log(
      `Projects: ${projectsCountResult.rows[0].count} -> ${finalProjectsCount.rows[0].count}`
    );
  } catch (error) {
    console.error("Error cleaning up data:", error);
  } finally {
    await client.end();
    console.log("Database connection closed");
  }
}

cleanupDuplicatedData().catch(console.error);
