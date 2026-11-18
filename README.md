# 💼 Remote Tech, AI & YC Startup Jobs Radar (MCP Server)

An official Model Context Protocol (MCP) server that aggregates **real-time remote software engineering, AI research, and Y Combinator startup job postings** across **Remotive, Arbeitnow, and HackerNews Jobs**.

Powered by Apify (`ceosuh/remote-tech-jobs-radar-mcp`) and built for **Career Coaching AI Agents, Automated Job Matchers, Claude Desktop, Cursor, and Windsurf**.

## 🚀 Quick Start (Claude Desktop / Cursor)

Add the following configuration to your `claude_desktop_config.json` or Cursor MCP settings:

```json
{
  "mcpServers": {
    "remote-tech-jobs-radar-mcp": {
      "command": "npx",
      "args": [
        "-y",
        "@apify/actors-mcp-server",
        "--actors",
        "ceosuh/remote-tech-jobs-radar-mcp"
      ],
      "env": {
        "APIFY_TOKEN": "your-apify-api-token"
      }
    }
  }
}
```

### Alternative: Run Local Bridge Directly

```bash
export APIFY_TOKEN="your-apify-api-token"
node index.js
```

## 🛠️ Tool Provided

* **`search_remote_tech_jobs`**: Queries Remotive, Arbeitnow, and Y Combinator HackerNews Jobs simultaneously for remote software engineering, AI, and startup roles.

## 📄 License

MIT License
