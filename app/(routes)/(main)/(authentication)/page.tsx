'use client'
import Link from 'next/link'
import { ArrowLeftIcon } from '@heroicons/react/24/solid'
import { useTranslations } from 'next-intl'
import setLanguageValue from '@/app/_actions/SetLanguageAction'

export default function NavBarAuthentication() {
	const t = useTranslations('AuthenticationLayout')

	return (
		<div className='flex items-center justify-between'>
			<Link
				className='flex items-center gap-compact text-body-sm'
				href={'/'}
			>
				<ArrowLeftIcon className='aspect-square h-[16px]' />
				{t('BackToShopping')}
			</Link>
			<form className='max-w-sm'>
				<select
					onChange={(e) => setLanguageValue(e.target.value)}
					className='block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-blue-500'
				>
					<option value='en'>{t('English')}</option>
					<option value='vi'>{t('Vietnamese')}</option>
				</select>
			</form>
		</div>
	)
}
