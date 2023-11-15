import { writable } from 'svelte/store';
import type { ToastPosition } from 'svoast';

export const emailAddress = writable<string>(undefined);
export const userId = writable<string>(undefined);
export const toastPosition = writable<ToastPosition>(undefined);
