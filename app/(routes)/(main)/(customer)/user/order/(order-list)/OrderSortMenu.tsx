'use client'

import { DefaultSortMenu } from '@/app/_components/SortMenu'
import { useTranslations } from 'next-intl'

export const OrderSortMenu = () => {
	const t = useTranslations('OrderSortMenu')
	return (
		<div className='flex items-center gap-compact'>
			<span className='text-body-sm font-semi-bold text-primary-418'>{t('SortBy')}</span>
			<DefaultSortMenu />
		</div>
	)
}
