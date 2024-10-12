import { ReactNode } from 'react'
import type { Metadata } from 'next'
import OrderStateFilterMenu from './OrderStateFilterMenu'
import { OrderSortMenu } from './OrderSortMenu'
import { useTranslations } from 'next-intl'

export const metadata: Metadata = {
	title: 'Order list',
	description: 'Where you can view your order list',
}

export default function UserOrderListPageLayout({ children }: { children: ReactNode }) {
	const t = useTranslations('UserOrderListPageLayout')
	return (
		<div className='flex-col-start w-full gap-cozy'>
			<div className='rounded-[4px] bg-neutral-gray-1 p-cozy shadow-38'>
				<h1 className='font-semi-bold text-primary-418'>{t('Title')}</h1>
				<div className='mt-cozy flex items-center justify-between'>
					<OrderStateFilterMenu />
					<OrderSortMenu />
				</div>
			</div>
			{children}
		</div>
	)
}
