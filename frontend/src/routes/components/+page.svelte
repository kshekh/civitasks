<script>
	import AvatarInput from '$components/reusable/AvatarInput.svelte';
	import Button from '$components/reusable/Button.svelte';
	import FileUpload from '$components/reusable/FileUpload.svelte';
	import Notification from '$components/reusable/Notification.svelte';
	import Stepper from '$components/reusable/Stepper.svelte';
	import Tabs from '$components/reusable/Tabs.svelte';
	import TextArea from '$components/reusable/TextArea.svelte';
	import TextInput from '$components/reusable/TextInput.svelte';
	import DropdownInput from '$components/reusable/dropdowns/DropdownInput.svelte';
	import SparkleIcon from '$icons/SparkleIcon.svelte';
	import CirclePlaceholderIcon from '$icons/placeholders/CirclePlaceholderIcon.svelte';
	import { toastCustom } from '$utils/toasts';
	import { LANGUAGES } from '$utils/constants';
</script>

<div class="py-12 px-6">
	<div class="mb-10">
		<h1 class="text-2xl font-bold text-gray-dark-12 underline font-architekt mb-6">File upload</h1>
		<FileUpload label="Label" description="Provide more context or description here" />
	</div>
	<div class="mb-10">
		<h1 class="text-2xl font-bold text-gray-dark-12 underline font-architekt">Stepper</h1>
		<div class="flex items-start gap-x-6 font-architekt">
			<div class="mt-2 space-y-4">
				<h2 class="text-gray-dark-12">Vertical</h2>
				<Stepper direction="vertical" steps={['Title', 'Title', 'Title', 'Title']} />
			</div>
			<div class="mt-2 space-y-4">
				<h2 class="text-gray-dark-12">Horizontal</h2>
				<Stepper direction="horizontal" steps={['Title', 'Title', 'Title', 'Title']} />
			</div>
		</div>
	</div>

	<div>
		<h1 class="text-2xl font-bold text-gray-dark-12 underline font-architekt">Buttons</h1>
		<div class="flex items-start gap-x-6 font-architekt">
			<div class="mt-6 space-y-4">
				<h2 class="text-gray-dark-12">Primary</h2>
				<Button
					primary
					size="sm"
					on:click={() => {
						toastCustom({
							position: 'bottom-center',
							title: 'Test message',
							positive: true,
							description: 'A brief one to show how it works!'
						});
					}}
				>
					<CirclePlaceholderIcon slot="left-icon" />
					<span>Toast</span>
					<CirclePlaceholderIcon slot="right-icon" />
				</Button>
				<Button disabled primary size="sm">
					<CirclePlaceholderIcon slot="left-icon" />
					<span>Button</span>
					<CirclePlaceholderIcon slot="right-icon" />
				</Button>
				<Button primary size="md">
					<CirclePlaceholderIcon slot="left-icon" />
					<span>Button</span>
					<CirclePlaceholderIcon slot="right-icon" />
				</Button>
				<Button disabled primary size="md">
					<CirclePlaceholderIcon slot="left-icon" />
					<span>Button</span>
					<CirclePlaceholderIcon slot="right-icon" />
				</Button>
			</div>
			<div class="mt-6 space-y-4">
				<h2 class="text-gray-dark-12">Secondary</h2>
				<Button secondary size="sm">
					<CirclePlaceholderIcon slot="left-icon" />
					<span>Button</span>
					<CirclePlaceholderIcon slot="right-icon" />
				</Button>
				<Button disabled secondary size="sm">
					<CirclePlaceholderIcon slot="left-icon" />
					<span>Button</span>
					<CirclePlaceholderIcon slot="right-icon" />
				</Button>
				<Button secondary size="md">
					<CirclePlaceholderIcon slot="left-icon" />
					<span>Button</span>
					<CirclePlaceholderIcon slot="right-icon" />
				</Button>
				<Button disabled secondary size="md">
					<CirclePlaceholderIcon slot="left-icon" />
					<span>Button</span>
					<CirclePlaceholderIcon slot="right-icon" />
				</Button>
			</div>
			<div class="mt-6 space-y-4">
				<h2 class="text-gray-dark-12">Tertiary</h2>
				<Button tertiary size="sm">
					<CirclePlaceholderIcon slot="left-icon" />
					<span>Button</span>
					<CirclePlaceholderIcon slot="right-icon" />
				</Button>
				<Button disabled tertiary size="sm">
					<CirclePlaceholderIcon slot="left-icon" />
					<span>Button</span>
					<CirclePlaceholderIcon slot="right-icon" />
				</Button>
				<Button tertiary size="md">
					<CirclePlaceholderIcon slot="left-icon" />
					<span>Button</span>
					<CirclePlaceholderIcon slot="right-icon" />
				</Button>
				<Button disabled tertiary size="md">
					<CirclePlaceholderIcon slot="left-icon" />
					<span>Button</span>
					<CirclePlaceholderIcon slot="right-icon" />
				</Button>
			</div>
			<div class="mt-6 space-y-4">
				<h2 class="text-gray-dark-12">Quaternary</h2>
				<Button quaternary size="sm">
					<CirclePlaceholderIcon slot="left-icon" />
					<span>Button</span>
					<CirclePlaceholderIcon slot="right-icon" />
				</Button>
				<Button disabled quaternary size="sm">
					<CirclePlaceholderIcon slot="left-icon" />
					<span>Button</span>
					<CirclePlaceholderIcon slot="right-icon" />
				</Button>
				<Button quaternary size="md">
					<CirclePlaceholderIcon slot="left-icon" />
					<span>Button</span>
					<CirclePlaceholderIcon slot="right-icon" />
				</Button>
				<Button disabled quaternary size="md">
					<CirclePlaceholderIcon slot="left-icon" />
					<span>Button</span>
					<CirclePlaceholderIcon slot="right-icon" />
				</Button>
			</div>
			<div class="mt-6 space-y-4">
				<h2 class="text-gray-dark-12">Quinary</h2>
				<Button quinary size="sm">
					<CirclePlaceholderIcon slot="left-icon" />
					<span>Button</span>
					<CirclePlaceholderIcon slot="right-icon" />
				</Button>
				<Button disabled quinary size="sm">
					<CirclePlaceholderIcon slot="left-icon" />
					<span>Button</span>
					<CirclePlaceholderIcon slot="right-icon" />
				</Button>
				<Button quinary size="md">
					<CirclePlaceholderIcon slot="left-icon" />
					<span>Button</span>
					<CirclePlaceholderIcon slot="right-icon" />
				</Button>
				<Button disabled quinary size="md">
					<CirclePlaceholderIcon slot="left-icon" />
					<span>Button</span>
					<CirclePlaceholderIcon slot="right-icon" />
				</Button>
			</div>
			<div class="mt-6 space-y-4">
				<h2 class="text-gray-dark-12">Danger</h2>
				<Button danger size="sm">
					<CirclePlaceholderIcon slot="left-icon" />
					<span>Button</span>
					<CirclePlaceholderIcon slot="right-icon" />
				</Button>
				<Button disabled danger size="sm">
					<CirclePlaceholderIcon slot="left-icon" />
					<span>Button</span>
					<CirclePlaceholderIcon slot="right-icon" />
				</Button>
				<Button danger size="md">
					<CirclePlaceholderIcon slot="left-icon" />
					<span>Button</span>
					<CirclePlaceholderIcon slot="right-icon" />
				</Button>
				<Button disabled danger size="md">
					<CirclePlaceholderIcon slot="left-icon" />
					<span>Button</span>
					<CirclePlaceholderIcon slot="right-icon" />
				</Button>
			</div>
			<div class="mt-6 space-y-4">
				<Button primary icon size="xs">
					<CirclePlaceholderIcon />
				</Button>
				<Button disabled primary icon size="xs">
					<CirclePlaceholderIcon />
				</Button>
				<Button primary icon size="sm">
					<CirclePlaceholderIcon />
				</Button>
				<Button disabled primary icon size="sm">
					<CirclePlaceholderIcon />
				</Button>
				<Button primary icon size="md">
					<CirclePlaceholderIcon />
				</Button>
				<Button disabled primary icon size="md">
					<CirclePlaceholderIcon />
				</Button>
			</div>
			<div class="mt-6 space-y-4">
				<Button secondary icon size="xs">
					<CirclePlaceholderIcon />
				</Button>
				<Button disabled secondary icon size="xs">
					<CirclePlaceholderIcon />
				</Button>
				<Button secondary icon size="sm">
					<CirclePlaceholderIcon />
				</Button>
				<Button disabled secondary icon size="sm">
					<CirclePlaceholderIcon />
				</Button>
				<Button secondary icon size="md">
					<CirclePlaceholderIcon />
				</Button>
				<Button disabled secondary icon size="md">
					<CirclePlaceholderIcon />
				</Button>
			</div>
			<div class="mt-6 space-y-4">
				<Button tertiary icon size="xs">
					<CirclePlaceholderIcon />
				</Button>
				<Button disabled tertiary icon size="xs">
					<CirclePlaceholderIcon />
				</Button>
				<Button tertiary icon size="sm">
					<CirclePlaceholderIcon />
				</Button>
				<Button disabled tertiary icon size="sm">
					<CirclePlaceholderIcon />
				</Button>
				<Button tertiary icon size="md">
					<CirclePlaceholderIcon />
				</Button>
				<Button disabled tertiary icon size="md">
					<CirclePlaceholderIcon />
				</Button>
			</div>
			<div class="mt-6 space-y-4">
				<Button quaternary icon size="xs">
					<CirclePlaceholderIcon />
				</Button>
				<Button disabled quaternary icon size="xs">
					<CirclePlaceholderIcon />
				</Button>
				<Button quaternary icon size="sm">
					<CirclePlaceholderIcon />
				</Button>
				<Button disabled quaternary icon size="sm">
					<CirclePlaceholderIcon />
				</Button>
				<Button quaternary icon size="md">
					<CirclePlaceholderIcon />
				</Button>
				<Button disabled quaternary icon size="md">
					<CirclePlaceholderIcon />
				</Button>
			</div>
			<div class="mt-6 space-y-4">
				<Button quinary icon size="xs">
					<CirclePlaceholderIcon />
				</Button>
				<Button disabled quinary icon size="xs">
					<CirclePlaceholderIcon />
				</Button>
				<Button quinary icon size="sm">
					<CirclePlaceholderIcon />
				</Button>
				<Button disabled quinary icon size="sm">
					<CirclePlaceholderIcon />
				</Button>
				<Button quinary icon size="md">
					<CirclePlaceholderIcon />
				</Button>
				<Button disabled quinary icon size="md">
					<CirclePlaceholderIcon />
				</Button>
			</div>
		</div>
	</div>
	<div>
		<h1 class="text-2xl font-bold text-gray-dark-12 underline font-architekt">Inputs</h1>
		<div class="flex items-start gap-x-6">
			<div class="w-[342px]">
				<div class="mt-6 space-y-4">
					<TextInput
						label="Label"
						placeholder="Placeholder"
						description="Provide more context or description here"
					>
						<CirclePlaceholderIcon slot="left-icon" />
						<CirclePlaceholderIcon slot="right-icon" />
					</TextInput>

					<TextInput
						label="Label"
						placeholder="Placeholder"
						description="Provide more context or description here"
						disabled
					>
						<CirclePlaceholderIcon slot="left-icon" />
						<CirclePlaceholderIcon slot="right-icon" />
					</TextInput>
					<TextInput
						label="Label"
						placeholder="Placeholder"
						description="Provide more context or description here"
						errors={['Describe the error here.', 'Describe the another error here.']}
					>
						<CirclePlaceholderIcon slot="left-icon" />
						<CirclePlaceholderIcon slot="right-icon" />
					</TextInput>
				</div>
			</div>
		</div>
	</div>
	<div>
		<h1 class="text-2xl font-bold text-gray-dark-12 underline font-architekt mt-10">Text Area</h1>
		<div class="flex items-start gap-x-6">
			<div class="w-[342px]">
				<div class="mt-6 space-y-4">
					<TextArea
						label="Label"
						placeholder="Placeholder"
						description="Provide more context or description here"
					>
						<CirclePlaceholderIcon slot="left-icon" />
						<CirclePlaceholderIcon slot="right-icon" />
					</TextArea>

					<TextArea
						label="Label"
						placeholder="Placeholder"
						description="Provide more context or description here"
						disabled
					>
						<CirclePlaceholderIcon slot="left-icon" />
						<CirclePlaceholderIcon slot="right-icon" />
					</TextArea>
					<TextArea
						label="Label"
						placeholder="Placeholder"
						description="Provide more context or description here"
						errors={['Describe the error here.', 'Describe the another error here.']}
					>
						<CirclePlaceholderIcon slot="left-icon" />
						<CirclePlaceholderIcon slot="right-icon" />
					</TextArea>
				</div>
			</div>
		</div>
	</div>
	<div>
		<h1 class="text-2xl font-bold text-gray-dark-12 underline font-architekt mt-10">
			Notifications
		</h1>
		<div class="flex flex-col gap-y-8">
			<div class="mt-6 flex gap-4 flex-wrap">
				<Notification title="Message" description="We’ll send a login link to user@domain.com">
					<Button secondary size="sm" class="flex-1">Button</Button>
					<Button quinary size="sm" class="flex-1">Button</Button>
				</Notification>
				<Notification
					positive
					title="Message"
					description="We’ll send a login link to user@domain.com"
				>
					<Button secondary size="sm" class="flex-1">Button</Button>
					<Button quinary size="sm" class="flex-1">Button</Button>
				</Notification>
				<Notification
					warning
					title="Message"
					description="We’ll send a login link to user@domain.com"
				>
					<Button secondary size="sm" class="flex-1">Button</Button>
					<Button quinary size="sm" class="flex-1">Button</Button>
				</Notification>
				<Notification
					negative
					title="Message"
					description="We’ll send a login link to user@domain.com"
				>
					<Button secondary size="sm" class="flex-1">Button</Button>
					<Button quinary size="sm" class="flex-1">Button</Button>
				</Notification>
				<Notification
					informational
					title="Message"
					description="We’ll send a login link to user@domain.com"
				>
					<Button secondary size="sm" class="flex-1">Button</Button>
					<Button quinary size="sm" class="flex-1">Button</Button>
				</Notification>
			</div>
			<div class="mt-6 flex gap-4 flex-wrap">
				<Notification title="Message">
					<Button secondary size="sm" class="flex-1">Button</Button>
					<Button quinary size="sm" class="flex-1">Button</Button>
				</Notification>
				<Notification positive title="Message">
					<Button secondary size="sm" class="flex-1">Button</Button>
					<Button quinary size="sm" class="flex-1">Button</Button>
				</Notification>
				<Notification warning title="Message">
					<Button secondary size="sm" class="flex-1">Button</Button>
					<Button quinary size="sm" class="flex-1">Button</Button>
				</Notification>
				<Notification negative title="Message">
					<Button secondary size="sm" class="flex-1">Button</Button>
					<Button quinary size="sm" class="flex-1">Button</Button>
				</Notification>
				<Notification informational title="Message">
					<Button secondary size="sm" class="flex-1">Button</Button>
					<Button quinary size="sm" class="flex-1">Button</Button>
				</Notification>
			</div>
		</div>
	</div>
	<div>
		<h1 class="text-2xl font-bold text-gray-dark-12 underline font-architekt mt-10">Tabs</h1>
		<div class="flex items-start gap-x-6 font-architekt">
			<div class="mt-6 space-y-4">
				<Tabs
					tabs={[
						{
							// icon: SparkleIcon,
							name: 'Tab 1'
						},
						{
							icon: SparkleIcon,
							name: 'Tab 2'
						},
						{
							icon: SparkleIcon,
							name: 'Tab 3'
						},
						{
							icon: SparkleIcon,
							name: 'Tab 4'
						},
						{
							// icon: SparkleIcon,
							name: 'Tab 5'
						}
					]}
				/>
			</div>
		</div>
	</div>
	<div>
		<h1 class="text-2xl font-bold text-gray-dark-12 underline font-architekt mt-10">Tabs</h1>
		<div class="mt-6 space-y-4">
			<AvatarInput />
		</div>
	</div>
	<div>
		<h1 class="text-2xl font-bold text-gray-dark-12 underline font-architekt mt-10">
			Dropdown Input
		</h1>
		<div class="mt-6 space-y-4 w-72">
			<DropdownInput
				label="Languages spoken"
				items={Object.values(LANGUAGES).flatMap((language) => language.name)}
				multiple
				icon={CirclePlaceholderIcon}
			/>
		</div>
	</div>
</div>
