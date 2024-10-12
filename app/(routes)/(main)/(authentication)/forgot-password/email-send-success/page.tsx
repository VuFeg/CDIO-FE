import { useTranslations } from 'next-intl'

export default function RegisterPage() {
	const t = useTranslations('EmailSentPage')
	return (
		<>
			<div className='flex h-full items-center justify-center'>
				<div className='flex-col-start  gap-[4px]'>
					<h1>{t('Title')}</h1>
					<p className='text-body-md'>{t('Description')}</p>
				</div>
			</div>
		</>
	)
}
