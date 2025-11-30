export function getLandingPage(baseUrl: string): string {
	return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>GitHub Trending API</title>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
            line-height: 1.6;
            color: #24292e;
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
        }
        h1 { border-bottom: 1px solid #eaecef; padding-bottom: 0.3em; }
        code { background-color: #f6f8fa; padding: 0.2em 0.4em; border-radius: 3px; font-family: SFMono-Regular, Consolas, "Liberation Mono", Menlo, monospace; font-size: 85%; }
        pre { background-color: #f6f8fa; padding: 16px; border-radius: 3px; overflow: auto; }
        .endpoint { margin-bottom: 30px; }
        .method { color: #28a745; font-weight: bold; }
        a { color: #0366d6; text-decoration: none; }
        a:hover { text-decoration: underline; }
    </style>
</head>
<body>
    <h1>GitHub Trending API</h1>
    <p>A simple API to fetch GitHub trending repositories.</p>

    <div class="endpoint">
        <h2>Get Trending Repositories</h2>
        <p><span class="method">GET</span> <code>/trending</code></p>

        <h3>Parameters</h3>
        <ul>
            <li><code>language</code>: Programming language (e.g., <code>javascript</code>, <code>python</code>, <code>go</code>)</li>
            <li><code>spoken_language</code>: Spoken language code (e.g., <code>en</code>, <code>zh</code>)</li>
            <li><code>since</code>: Time range (<code>daily</code>, <code>weekly</code>, <code>monthly</code>)</li>
        </ul>

        <h3>Example Usage</h3>
        <p>
            <a href="${baseUrl}/trending?language=typescript&since=weekly" target="_blank">
                ${baseUrl}/trending?language=typescript&since=weekly
            </a>
        </p>
    </div>

    <footer>
        <p>Powered by Cloudflare Workers</p>
    </footer>
</body>
</html>`;
}

