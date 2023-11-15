<script lang="ts">
	import Upload from '$icons/Upload.svelte';
	import Dropzone from 'svelte-file-dropzone/Dropzone.svelte';
	import Button from './Button.svelte';
	import CloseIcon from '$icons/CloseIcon.svelte';
	import DeleteIcon from '$icons/DeleteIcon.svelte';
	import CircleCheckIcon from '$icons/checks/CircleCheckIcon.svelte';
	import DocumentIcon from '$icons/files/DocumentIcon.svelte';
	import ImageIcon from '$icons/files/ImageIcon.svelte';
	import VideoIcon from '$icons/files/VideoIcon.svelte';
	import ErrorWarningAlertIcon from '$icons/ErrorWarningAlertIcon.svelte';
	import { persistLocalStorageForm, retrieveLocalStorageForm } from '$utils';
	import { projectFilesLocalStorageKey } from '$utils/constants';
	import { VITE_API_BASE_URL } from '$lib/env';
	type SELECTED_FILE = {
		status: 'uploaded' | 'uploading' | 'upload-failed';
		name: string;
		size: number;
		type: string;
		percentageUploaded: number;
		errorMessage?: string;
		id?: number;
	};
	let files: SELECTED_FILE[] = [];
	export let label = '';
	export let description = '';
	export let id = crypto.randomUUID();
	export let multiple = true;
	export let imageIds: number[] = [];
	export let maxSize = 3;
	export let maxFiles = 2;
	export let accept: string[] | undefined = undefined;
	export let errors: string[] = [];
	export let isUploading = false;
	// TODO handle upload cancelling
	// TODO handle upload failure
	// TODO retry uploading
	const handleFilesSelect = (e: CustomEvent) => {
		const { acceptedFiles } = e.detail;
		if (files?.length == maxFiles) {
			errors = errors.filter((error) => error != `A maximum of ${maxFiles} files is allowed.`);
			errors = [...errors, `Only ${maxFiles} files allowed`];
		} else if (acceptedFiles?.[0]?.size > maxSize * 1024 * 1024) {
			errors = errors.filter(
				(error) =>
					error !=
					`Files cannot exceed ${maxSize}MB total in size. Additional resources may be submitted as links in the final section.`
			);
			errors = [
				...errors,
				`Files cannot exceed ${maxSize}MB total in size. Additional resources may be submitted as links in the final section.`
			];
		} else {
			const file: SELECTED_FILE = {
				status: 'uploading',
				// file: acceptedFiles?.[0],
				name: acceptedFiles?.[0].name,
				size: acceptedFiles?.[0].size,
				type: acceptedFiles?.[0].type,
				percentageUploaded: 0
			};
			files = [...files, file];
			handleUpload(acceptedFiles?.[0]);
		}
	};

	const handleUpload = async (uploadFile: File) => {
		const formData = new FormData();
		formData.append('image', uploadFile);
		const xhr = new XMLHttpRequest();
		xhr.upload.onprogress = function (evt) {
			if (evt.lengthComputable) {
				var percentComplete = Number((evt.loaded / evt.total) * 100);

				files = files.filter((file) => {
					if (file.name == file.name) {
						file.percentageUploaded = percentComplete;
					}
					return file;
				});
			}
		};
		xhr.onload = () => {
			imageIds = [...imageIds, JSON.parse(xhr.response)!.id];
			files = files.filter((file) => {
				if (file.name == uploadFile.name) {
					file.status = 'uploaded';
					file.id = JSON.parse(xhr.response)!.id;
				}
				return file;
			});
		};
		xhr.onerror = () => {
			files = files.filter((file) => {
				if (file.name == uploadFile.name) {
					file.status = 'upload-failed';
				}
				return file;
			});
		};
		xhr.open('POST', `${VITE_API_BASE_URL}/api/projects/image`, true);
		xhr.send(formData);
	};
	$: message =
		(accept
			?.map((mime) => {
				return {
					ext: `.${mime.split('/')[1]}`.toUpperCase()
				};
			})
			?.flatMap((e) => e.ext)
			?.join(', ') ?? '') + ` Up to ${maxSize}MB`;
	$: isUploading = files?.find((file) => file.status == 'uploading') ? true : false;
	$: persistLocalStorageForm(projectFilesLocalStorageKey, files);
	$: files = retrieveLocalStorageForm(projectFilesLocalStorageKey) ?? [];
</script>

<div
	class="w-full max-w-full flex flex-col items-start font-inter text-xs leading-4 font-normal {$$props.class}"
>
	<label for={id} class="">
		<p class="font-architekt text-sm text-gray-dark-12 leading-5 font-normal">{label}</p>
		<p class="text-xs text-gray-dark-11 mt-1 mb-3">
			{description}
		</p>
	</label>
	<Dropzone
		on:drop={handleFilesSelect}
		containerClasses="w-full p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-3xs border border-dashed border-gray-dark-4 bg-gray-dark-1"
		{accept}
		{multiple}
		disableDefaultStyles
	>
		<div class="w-9 h-9 flex items-center justify-center bg-gray-dark-2 rounded">
			<Upload class="w-4 h-4 text-gray-dark-12" />
		</div>
		<div
			class="flex-1 flex flex-col gap-y-1.5 font-inter text-sm font-medium leading-4 text-gray-dark-12"
		>
			<span>Drag and drop or browse</span>
			<span class="text-gray-dark-11">{message}</span>
		</div>
		<Button tertiary size="sm">Browse</Button>
	</Dropzone>
	{#if errors?.length > 0}
		{#each errors as error}
			{#if error}
				<div class="text-red-dark-10 flex justify-start items-center gap-x-1 gap-y-0.5 mt-2">
					<ErrorWarningAlertIcon />
					<p class="text-red-dark-10">{error}</p>
				</div>
			{/if}
		{/each}
	{/if}
</div>
{#if files?.length > 0}
	<div class="mt-3 space-y-2">
		{#each files as file, i}
			<div
				class=" rounded p-3 flex items-start justify-between gap-x-2 relative {file.status ==
				'uploading'
					? 'bg-mint-dark-2'
					: 'bg-gray-dark-2'}"
			>
				{#if file.status == 'uploading'}
					<div class="absolute inset-x-0 bottom-0 h-1 bg-mint-dark-5">
						<div class="h-full bg-mint-dark-11" style="width: {file.percentageUploaded}%;" />
					</div>
				{/if}
				<div>
					{#if file.type.includes('image/')}
						<ImageIcon class="w-5 h-5 text-gray-dark-12" />
					{:else if file.type.includes('video/')}
						<VideoIcon class="w-5 h-5 text-gray-dark-12" />
					{:else}
						<DocumentIcon class="w-5 h-5 text-gray-dark-12" />
					{/if}
				</div>
				<div class="flex-1 flex items-start gap-1.5">
					<div
						class=" flex flex-col gap-y-1.5 font-inter text-sm font-medium leading-4 {file.status ==
						'uploading'
							? 'text-mint-dark-12'
							: 'text-gray-dark-12'}"
					>
						<span>{file.name}</span>
						{#if file.status == 'uploaded'}
							{#if file.size / (1024 * 1024) >= 1}
								<span>{(file.size / (1024 * 1024)).toFixed()} MB</span>
							{:else if file.size / 1024 >= 1}
								<span>{(file.size / 1024).toFixed()} KB</span>
							{:else}
								<span>{file.size.toFixed()} B</span>
							{/if}
						{:else if file.status == 'uploading'}
							<div class="flex items-center gap-x-2 text-mint-dark-11">
								{#if file.size / (1024 * 1024) >= 1}
									<span>{(file.size / (1024 * 1024)).toFixed()} MB</span>
								{:else if file.size / 1024 >= 1}
									<span>{(file.size / 1024).toFixed()} KB</span>
								{:else}
									<span>{file.size.toFixed()} B</span>
								{/if}
								<div class="w-1 h-1 bg-mint-dark-6 rounded-[1px]" />
								<span>{file.percentageUploaded.toFixed(2)}% Uploaded</span>
							</div>
						{/if}
					</div>
					{#if file.status == 'uploaded'}
						<div class="!w-4 !h-4 text-mint-dark-11">
							<CircleCheckIcon />
						</div>
					{/if}
				</div>
				{#if file.status == 'uploading'}
					<Button quaternary size="xs" icon><CloseIcon class="text-mint-dark-11" /></Button>
				{:else if file.status == 'uploaded'}
					<Button
						quaternary
						size="xs"
						icon
						on:click={() => {
							files = files?.filter((f) => file != f);
							imageIds = imageIds?.filter((id) => id != file.id);
						}}><DeleteIcon class="text-gray-dark-12" /></Button
					>
				{/if}
			</div>
		{/each}
	</div>
{/if}
