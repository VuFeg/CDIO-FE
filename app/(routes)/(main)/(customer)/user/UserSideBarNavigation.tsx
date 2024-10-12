'use client'
import Link from 'next/link'
import React from 'react'
import { UserIcon, TruckIcon, HandThumbUpIcon } from '@heroicons/react/24/solid'
import clsx from 'clsx'
import useActivePath from '@/app/_hooks/useActivePath'
import { useTranslations } from 'next-intl'

type UserNavigation = {
	label: string
	path: string
	icon?: React.ReactNode
}

export default React.memo(function UserSidebarNavigation() {
	const t = useTranslations('UserSidebarNavigation')
	const userNavigationList: UserNavigation[] = [
		{
			path: '/setting/profile',
			label: t('AccountSettings'),
			icon: <UserIcon className='aspect-square w-[24px]' />,
		},
		{
			path: '/order',
			label: t('OrderList'),
			icon: <TruckIcon className='aspect-square w-[24px]' />,
		},
		{
			path: '/purchased',
			label: t('PurchasedProducts'),
			icon: <HandThumbUpIcon className='aspect-square w-[24px]' />,
		},
	]
	return (
		<ul className='flex-col-start sticky top-away-from-header gap-compact rounded-[8px] border-y-[1px] border-l-[1px] border-primary-625-20  bg-white py-comfortable pl-comfortable shadow-38'>
			{userNavigationList.map((nav) => (
				<li key={nav.label}>
					<Navigation
						path={nav.path}
						icon={nav.icon}
						label={nav.label}
					/>
				</li>
			))}
		</ul>
	)
})

const Navigation = React.memo(function Navigation({ label, path, icon }: UserNavigation) {
	const rootPath = '/user'
	const { isPathActive } = useActivePath()

	return (
		<Link
			href={rootPath + path}
			scroll
			className={clsx('group flex w-full items-center  gap-compact rounded-l-[8px] p-cozy ', {
				'cursor-pointer text-primary-625 transition duration-75 ease-linear hover:bg-primary-580-20/80 hover:font-semibold':
					isPathActive(`${rootPath}${path}`) === false,
				'pointer-events-none cursor-auto bg-primary-625 font-bold text-neutral-gray-1':
					isPathActive(`${rootPath}${path}`) === true,
			})}
		>
			{icon}
			<label className='text-body-sm capitalize group-hover:cursor-pointer'>{label}</label>
		</Link>
	)
})
