<script lang="ts">
	import Button from '$components/reusable/Button.svelte';
	import RadioGroup from '$components/reusable/RadioGroup.svelte';
	import TextInput from '$components/reusable/TextInput.svelte';
	import Checkbox from '$components/reusable/checkbox/Checkbox.svelte';
	import CheckboxGroup from '$components/reusable/checkbox/CheckboxGroup.svelte';
	import { MARKETING_CHANNELS, SOLANA_INITIATIVES } from '$utils/constants';
	import type {
		ISourceAndReferralParams,
		ISourceAndReferralParamsErrors
	} from '$utils/interfaces/onboarding';
	let contributingSources: string[] = [];
	export let fieldErrors: Partial<ISourceAndReferralParamsErrors> = {};
	export let sourceAndReferrals: ISourceAndReferralParams = {
		primarySource: {},
		agreedToTerms: false,
		referralCode: ''
	};
	export let disabled: boolean;
	const updateContributingSources = () => {
		sourceAndReferrals.contributingSources = [];
		contributingSources?.forEach((name) => {
			sourceAndReferrals.contributingSources = sourceAndReferrals.contributingSources?.concat({
				name
			});
		});
	};
	$: disabled = !sourceAndReferrals?.agreedToTerms || !sourceAndReferrals.primarySource.name;
</script>

<div class="my-3xl w-full">
	<h2 class="mb-3xl">// A FEW MORE DETAILS</h2>
	<div class=" flex flex-col gap-y-lg">
		<CheckboxGroup
			direction="vertical"
			multiple={false}
			label="How did you hear about Hyperdrive hackathon?"
			items={MARKETING_CHANNELS}
			bind:value={sourceAndReferrals.primarySource.name}
		/>
		<CheckboxGroup
			direction="vertical"
			label="Did any of the following Solana initiatives significantly contribute to getting you to participate in the Hyperdrive Hackathon?"
			items={SOLANA_INITIATIVES}
			bind:checked={contributingSources}
			on:change={updateContributingSources}
		/>
		<TextInput
			label="Have a referral code? Enter here."
			bind:value={sourceAndReferrals.referralCode}
		/>
		<Checkbox
			label="I agree to the terms and conditions of the Solana Hyperdrive Hackathon."
			bind:checked={sourceAndReferrals.agreedToTerms}
		/>
	</div>
</div>
