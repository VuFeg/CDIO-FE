import Image from 'next/image'
import Step1 from '@/app/_assets/images/homepage/buyingprocess/step1.svg'
import Step2 from '@/app/_assets/images/homepage/buyingprocess/step2.svg'
import Step3 from '@/app/_assets/images/homepage/buyingprocess/step3.svg'
import Step4 from '@/app/_assets/images/homepage/buyingprocess/step4.svg'
import Step5 from '@/app/_assets/images/homepage/buyingprocess/step5.svg'
import { useTranslations } from 'next-intl'

type BuyingStepType = {
	label: string
	icon: any //NOTE: because icons are svgr, so the library recommend to use any type to avoid conflict
}

export default function BuyingProcess() {
	const t = useTranslations('BuyingProcess')
	const buyingProcess: BuyingStepType[] = [
		{
			label: t('Step1'),
			icon: Step1,
		},
		{
			label: t('Step2'),
			icon: Step2,
		},
		{
			label: t('Step3'),
			icon: Step3,
		},
		{
			label: t('Step4'),
			icon: Step4,
		},
		{
			label: t('Step5'),
			icon: Step5,
		},
	]
	return (
		<section className='section-home bg-primary-5555-20/20'>
			<div className='flex-col-start container items-center gap-comfortable'>
				<h2 className='text-heading-1 text-primary-418'>{t('Title')}</h2>
				<div className='flex  w-full items-center justify-center gap-comfortable'>
					{buyingProcess.map((step, index, row) => (
						<>
							<BuyingStep
								key={step.label}
								{...step}
							/>
						</>
					))}
				</div>
			</div>
		</section>
	)
}

function BuyingStep({ label, icon }: BuyingStepType) {
	return (
		<div className='flex-col-start items-center gap-cozy'>
			<div className='aspect-square w-[100px] border-[1px] border-primary-5555-60 bg-neutral-gray-1 p-cozy shadow-26'>
				<Image
					src={icon}
					alt='buyingprocess'
					width={0}
					height={0}
					sizes='100vw'
				/>
			</div>
			<p className='text-body-md font-semi-bold capitalize text-primary-625'>{label}</p>
		</div>
	)
}
