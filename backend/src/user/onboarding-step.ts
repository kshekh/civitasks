/**
 * * * * * * * * * * * * * * * * * * * * * * * * *
 * * DEPRECATED - this file is no longer used. * *
 * * * * * * * * * * * * * * * * * * * * * * * * *
 * 
 */
export enum OnboardingStep {
  ABOUT_YOU,
  INTERESTS_AND_SKILLS,
  SOURCE_AND_REFERRAL,
  COMPLETE
};

type OnboardingStepKey = keyof typeof OnboardingStep;

/**
 * Users can access the immediate next step of the flow,
 * or go back to any previous step, but cannot skip ahead.
 * They also cannot go back and access onboarding once complete.
 * 
 * currentStep is a string here because this is how we store onboarding 
 * steps in the database. It's converted to the proper enum before comparing.
 * @param currentStep 
 * @param nextStep 
 * @returns 
 */
export function canAccessStep(currentStep: string, nextStep: OnboardingStep): boolean {
  const currentStepEnum = OnboardingStep[currentStep as OnboardingStepKey];
  if (!currentStepEnum || currentStepEnum === OnboardingStep.COMPLETE) {
    return false;
  }
  return nextStep <= currentStepEnum + 1;
}

/**
 * Check to see if we should increment the onboarding step on the user model.
 * If the user is just going back to edit a step they've already submitted, then
 * we shouldn't increment the step because then they may not be able to skip
 * back ahead to where they were.
 * 
 * @param storedStep 
 * @param nextStep 
 * @returns 
 */
export function shouldIncrementStep(storedStep: string, nextStep: OnboardingStep): boolean {
  const storedStepEnum = OnboardingStep[storedStep as OnboardingStepKey];
  if (!storedStepEnum) {
    return false;
  }
  return nextStep === storedStepEnum + 1;
}
