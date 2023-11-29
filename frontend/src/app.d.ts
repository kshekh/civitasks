// See https://kit.svelte.dev/docs/types#app

import type Client from '$lib/api/Client';

// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			client: Client;
		}
		// interface PageData {}
		interface Platform {
			env: {
				COUNTER: DurableObjectNamespace;
			};
			context: {
				waitUntil(promise: Promise<any>): void;
			};
			caches: CacheStorage & { default: Cache };
		}
	}
}

export {};
