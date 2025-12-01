import * as cheerio from 'cheerio';
import { getLandingPage } from './landing';

export default {
	async fetch(request, env, ctx): Promise<Response> {
		const url = new URL(request.url);

		// Default route
		if (url.pathname === "/") {
			return new Response(getLandingPage(url.origin), {
				headers: {
					"Content-Type": "text/html; charset=UTF-8"
				}
			});
		}

		// Trending route
		if (url.pathname === "/trending") {
			try {
				const spoken_language = url.searchParams.get("spoken_language");
				const language = url.searchParams.get("language");
				const since = url.searchParams.get("since");

				let githubUrl = "https://github.com/trending";
				const params: string[] = [];

				if (spoken_language) params.push(`spoken_language_code=${spoken_language}`);
				if (language) params.push(`language=${language}`);
				if (since) params.push(`since=${since}`);

				if (params.length) githubUrl += `?${params.join("&")}`;

				const userAgent = request.headers.get("User-Agent") || "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.114 Safari/537.36";
				// Fetch from GitHub
				const response = await fetch(githubUrl, {
					headers: {
						// Add User-Agent to avoid being blocked by GitHub
						"User-Agent": userAgent
					}
				});

				if (!response.ok) {
					throw new Error(`GitHub returned ${response.status}`);
				}

				const html = await response.text();
				const $ = cheerio.load(html);
				const repositories: any[] = [];

				$(".Box article.Box-row").each((index, element) => {
					const builtBy = Array.from($(element).find(">div:nth-child(4)>span:nth-child(4)").children()).map(it => {
						const username = ($(it).attr('href') + '').slice(1);
						const link = 'https://github.com/' + username;
						const avatar = $(it).children().eq(0).attr('src');
						return {
							username,
							link,
							avatar
						}
					});
					const periodStars = parseInt($(element).find(">div:nth-child(4)>span:nth-child(5)").contents().eq(2).text().replace(/\D+/g, ''));

					const [owner, repoName] = $(element).find("h2 a").text().trim().replace(/\s+/g, "").split('/');

					const repo = {
						owner,
						repoName,
						description: $(element).find("p").text().trim(),
						language: $(element).find('[itemprop="programmingLanguage"]').text().trim(),
						stars: parseInt($(element).find(".Link--muted:first").text().trim().replace(/,/g, '')),
						forks: parseInt($(element).find(".Link--muted:nth-of-type(2)").text().trim().replace(/,/g, '')),
						url: `https://github.com${$(element).find("h2 a").attr("href")}`,
						builtBy,
						periodStars
					};
					repositories.push(repo);
				});

				if (!repositories || repositories.length === 0) {
					return new Response(JSON.stringify({ message: "You have given wrong parameters" }), {
						headers: {
							"Content-Type": "application/json"
						}
					});
				}

				return new Response(JSON.stringify(repositories, null, 2), {
					headers: {
						"Content-Type": "application/json"
					}
				});

			} catch (error) {
				console.error(error);
				return new Response("Error scraping GitHub Trending page.", {
					status: 500
				});
			}
		}

		return new Response("Not Found", { status: 404 });
	},
} satisfies ExportedHandler<Env>;
