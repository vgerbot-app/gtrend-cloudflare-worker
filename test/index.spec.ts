import { env, createExecutionContext, waitOnExecutionContext, SELF } from 'cloudflare:test';
import { describe, it, expect } from 'vitest';
import worker from '../src/index';

// For now, you'll need to do something like this to get a correctly-typed
// `Request` to pass to `worker.fetch()`.
const IncomingRequest = Request<unknown, IncomingRequestCfProperties>;

describe('Trending API worker', () => {
	it('responds with documentation (unit style)', async () => {
		const request = new IncomingRequest('http://example.com');
		// Create an empty context to pass to `worker.fetch()`.
		const ctx = createExecutionContext();
		const response = await worker.fetch(request, env, ctx);
		// Wait for all `Promise`s passed to `ctx.waitUntil()` to settle before running test assertions
		await waitOnExecutionContext(ctx);

		const text = await response.text();
		expect(text).toContain('GitHub Trending API');
		expect(text).toContain('http://example.com/trending?language=typescript&since=weekly');
	});

	it('responds with documentation (integration style)', async () => {
		const response = await SELF.fetch('https://example.com');
		const text = await response.text();
		expect(text).toContain('GitHub Trending API');
		expect(text).toContain('https://example.com/trending?language=typescript&since=weekly');
	});
});
