import Notification from '$components/reusable/Notification.svelte';
import { ClientResponseError } from '$lib/api/ClientResponseError';
import { toastPosition } from '$stores';
import { toast, type ToastPosition } from 'svoast';

export const toastCustom = (options: {
	position: ToastPosition;
	title?: string;
	description?: string;
	positive?: boolean;
	warning?: boolean;
	negative?: boolean;
	informational?: boolean;
	noIcon?: boolean;
}) => {
	const { position, ...notificationProps } = options;
	toastPosition.set(position);
	toast.success('Successfully saved!', {
		component: [Notification, notificationProps]
	});
};

export const toastError = (error: any) => {
	let errorString;
	if (typeof error == 'string') errorString = error;
	else if (error instanceof ClientResponseError) {
		if ((error.status = 401)) return;
		else errorString = error.originalError.data;
	} else if (error.isSuperTokensGeneralError === true) {
		errorString = error.message;
	} else errorString = 'Something went wrong. Please try again';

	toastCustom({ position: 'bottom-center', negative: true, description: errorString });
};
