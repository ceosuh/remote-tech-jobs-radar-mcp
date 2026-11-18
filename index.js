#!/usr/bin/env node
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { CallToolRequestSchema, ListToolsRequestSchema } from "@modelcontextprotocol/sdk/types.js";

const APIFY_TOKEN = process.env.APIFY_TOKEN;
const ACTOR_ID = "ceosuh~remote-tech-jobs-radar-mcp";

const server = new Server(
  { name: "remote-tech-jobs-radar-mcp", version: "1.0.0" },
  { capabilities: { tools: {} } }
);

server.setRequestHandler(ListToolsRequestSchema, async () => ({
  tools: [
    {
      name: "search_remote_tech_jobs",
      description: "Search real-time remote tech, AI, and Y Combinator startup job listings across Remotive, Arbeitnow, and HackerNews Jobs.",
      inputSchema: {
        type: "object",
        properties: {
          keywords: {
            type: "array",
            items: { type: "string" },
            description: "Job roles, programming languages, or skills (e.g., ['AI', 'python', 'typescript', 'fullstack'])",
            default: ["AI", "python", "typescript"]
          },
          maxResultsPerSource: {
            type: "number",
            description: "Maximum job postings per platform (1-15)",
            default: 5
          }
        },
        required: ["keywords"]
      }
    }
  ]
}));

server.setRequestHandler(CallToolRequestSchema, async (request) => {
  if (request.params.name !== "search_remote_tech_jobs") {
    throw new Error(`Unknown tool: ${request.params.name}`);
  }
  if (!APIFY_TOKEN) {
    throw new Error("Missing APIFY_TOKEN environment variable. Get yours at https://console.apify.com/settings/integrations");
  }

  const response = await fetch(
    `https://api.apify.com/v2/acts/${ACTOR_ID}/run-sync-get-dataset-items?token=${APIFY_TOKEN}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(request.params.arguments || {})
    }
  );

  if (!response.ok) {
    const errText = await response.text();
    throw new Error(`Apify API error (${response.status}): ${errText}`);
  }

  const data = await response.json();
  return {
    content: [{ type: "text", text: JSON.stringify(data, null, 2) }]
  };
});

const transport = new StdioServerTransport();
await server.connect(transport);
