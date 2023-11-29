import type { ICountdown } from './interfaces/countdown';
import { writable, type Writable } from 'svelte/store';
import { browser } from '$app/environment';
export const copyToClipBoard = (text: string | undefined) => {
	navigator?.clipboard && navigator?.clipboard.writeText(text as string);
};

export const clickOutside = (node: HTMLElement, callback: Function) => {
	const handleClick = (event: any) => {
		if (!node.contains(event.target)) {
			// node.dispatchEvent(new CustomEvent('outclick'));
			callback();
		}
	};

	document.addEventListener('click', handleClick, true);

	return {
		destroy() {
			document.removeEventListener('click', handleClick, true);
		}
	};
};

export const countdownTimer = (from: Date): Writable<Partial<ICountdown>> => {
	const countDownDate = from.getTime();
	let countdown: Writable<Partial<ICountdown>> = writable({});
	// Update the count down every 1 second
	let x = setInterval(() => {
		// Get today's date and time
		let now = new Date().getTime();

		// Find the distance between now and the count down date
		let timeDifference = countDownDate - now;

		// Time calculations for days, hours, minutes and seconds
		countdown.set({
			days: Math.floor(timeDifference / (1000 * 60 * 60 * 24)),
			hours: Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
			minutes: Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60)),
			seconds: Math.floor((timeDifference % (1000 * 60)) / 1000)
		});

		// Output the result in an element with id="demo"

		// If the count down is over, write some text
		if (timeDifference < 0) {
			clearInterval(x);
		}
	}, 1000);
	return countdown;
};

export const persistLocalStorageForm = <T>(name: string, data: T) => {
	if (!browser) return;
	localStorage.setItem(name, JSON.stringify(data));
};
export const retrieveLocalStorageForm = <T>(name: string): T => {
	if (!browser) return null as T;
	const data = JSON.parse(localStorage.getItem(name) as string);
	return data === undefined ? (null as T) : (data as T);
};
export const clearLocalStorageForm = (name: string) => {
	if (!browser) return;
	localStorage.removeItem(name);
};
