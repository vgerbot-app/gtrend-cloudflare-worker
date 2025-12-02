# GitHub Trending API (Cloudflare Worker)

A Cloudflare Worker that scrapes GitHub Trending pages to provide a JSON API for trending repositories. Built with TypeScript and Cheerio.

## Features

- 🚀 Serverless Cloudflare Worker
- 🕷️ Scrapes live data from GitHub Trending
- 🔍 Supports filtering by programming language, spoken language, and time range
- ⚡ Fast and lightweight

## API Reference

### Health Check

```http
GET /
```

Returns a simple message indicating the system is functional.

**Response:**
```text
System is now functional
```

### Get Trending Repositories

```http
GET /trending
```

Fetches the current trending repositories from GitHub.

**Query Parameters:**

| Parameter | Type | Description | Example |
| :--- | :--- | :--- | :--- |
| `language` | `string` | Programming language to filter by | `javascript`, `python`, `go` |
| `spoken_language` | `string` | Spoken language code | `en`, `zh`, `es` |
| `since` | `string` | Time range | `daily`, `weekly`, `monthly` |

**Example Request:**

```bash
curl "http://localhost:8787/trending?language=typescript&since=weekly"
```

**Example Response:**

```json
[
  {
    "position": 1,
    "owner": "user",
    "repoName": "repo",
    "description": "Repository description...",
    "language": "TypeScript",
    "stars": 1500,
    "forks": 200,
    "builtBy": [{
    	"username": "xxxx"
      "avatar": "/u/xxxx?s=40&v=4"
    }],
    "periodStars": 15
  }
  // ...
]
```

## Development

### Prerequisites

- Node.js
- pnpm (or npm/yarn)

### Installation

```bash
pnpm install
```

### Run Locally

Start the local development server:

```bash
pnpm run dev
```

The API will be available at `http://localhost:8787`.

### Testing

Run the test suite:

```bash
pnpm test
```

## Deployment

Deploy to Cloudflare Workers:

```bash
pnpm run deploy
```

## Project Structure

- `src/index.ts`: Main worker logic and API endpoints.
- `test/`: Tests using Vitest.
- `wrangler.jsonc`: Cloudflare Wrangler configuration.
