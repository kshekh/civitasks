import {
	Body,
	Button,
	Container,
	Head,
	Heading,
	Html,
	Img,
	Section,
	Tailwind,
	Text,
	Font
} from '@react-email/components';
import * as React from 'react';

interface EmailConfirmationProps {
	verifyLink?: string;
}
export const EmailConfirmation = ({ verifyLink = '' }: EmailConfirmationProps) => {
	return (
		<Tailwind
			config={{
				theme: {
					extend: {
						fontFamily: {
							architekt: 'nb-architekt, Arial, sans-serif',
							inter: 'Inter, Arial, sans-serif',
							unbounded: 'Unbounded, Arial, sans-serif'
						}
					}
				}
			}}
		>
			<Html>
				<Head>
					<Font
						fontFamily="nb-architekt"
						fallbackFontFamily="Helvetica"
						webFont={{
							url: './fonts/nb-architekt/nb-architekt-regular.otf',
							format: 'opentype'
						}}
						fontWeight={400}
						fontStyle="normal"
					/>
					<Font
						fontFamily="Inter"
						fallbackFontFamily="Helvetica"
						webFont={{
							url: 'https://fonts.googleapis.com/css2?family=Inter&display=swap'
						}}
						fontWeight={400}
						fontStyle="normal"
					/>
				</Head>

				<Body className="bg-[#0F0F0F]  mx-auto my-auto sm:w-full max-w-[600px] font-architekt">
					<Container className="w-full">
						<Section className="py-4 border-b border-solid border-[#232323] text-center w-full min-w-full">
							<Button href="https://solana.com/hyperdrive">
								<Img
									src="https://static.narrative-violation.com/solana_logo.png"
									width="107"
									alt="Solana"
									className="my-0 mx-auto"
								/>
							</Button>
						</Section>
						<Section className="pt-20 pb-8 ">
							<Img
								src="https://static.narrative-violation.com/email_verification_icon.png"
								width="56"
								height="56"
								alt="Solana"
								className="my-0 mx-auto"
							/>
						</Section>
						<Section className="px-6 sm:px-12">
							<Heading className="text-[#F7F7F7] text-lg sm:text-[28px] leading-9 font-normal text-center uppercase font-architekt">
								Activate your account
							</Heading>
							<Text className="text-[#A0A0A0] text-sm leading-4 font-normal mt-3 mb-6 text-center font-inter">
								Thank you for creating your account. In order to start using it, please activate it
								using the button below.
							</Text>
							<Section className="w-full pb-32">
								<Button
									className="bg-[#04312C] rounded text-[#25D0AB] py-3 text-sm font-normal w-full max-w-full text-center uppercase font-architekt"
									href={verifyLink}
								>
									Confirm account
								</Button>
							</Section>
						</Section>
					</Container>
				</Body>
			</Html>
		</Tailwind>
	);
};

export default EmailConfirmation;
