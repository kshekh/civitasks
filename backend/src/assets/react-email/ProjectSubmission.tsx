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
	Font,
	Link
} from '@react-email/components';
import * as React from 'react';

export const ProjectSubmission = () => {
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
							url: '../fonts/nb-architekt/nb-architekt-regular.otf',
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
								src="https://static.narrative-violation.com/project_submitted_email_icon.png"
								width="56"
								height="56"
								alt="Solana"
								className="my-0 mx-auto"
							/>
						</Section>
						<Section className="px-6 sm:px-12">
							<Heading className="text-[#F7F7F7] text-lg sm:text-[28px] leading-9 font-normal text-center uppercase font-architekt">
								PROJECT SUBMITTED!
							</Heading>
							<Text className="text-[#A0A0A0] text-sm leading-5 font-normal mt-3 mb-6 text-center font-inter">
								Thanks for submitting your Hyperdrive Hackathon project! After all the submissions
								are collected, projects will be reviewed by the judges. Winners will be announced
								live at
								<span>
									<Link href="https://solana.com/breakpoint"> Breakpoint </Link>
								</span>
								, and online during the week of October 30th.
							</Text>
							<Section className="border-t border-solid border-[#7E7E7E] my-6"></Section>
							<Section>
								<Text className="text-[#707070] text-xs leading-4 font-normal text-center font-inter mx-auto px-12 mb-32">
									In case you need to make any updates, you'll be able to do so until the end of the
									submission period on October 15th, 2023.
								</Text>
							</Section>
						</Section>
					</Container>
				</Body>
			</Html>
		</Tailwind>
	);
};

export default ProjectSubmission;
