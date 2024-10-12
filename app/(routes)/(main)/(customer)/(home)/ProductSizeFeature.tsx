'use client'

import clsx from 'clsx'
import { useState } from 'react'
import Link from 'next/link'
import { SHOP_ROUTE } from '@/app/_configs/constants/variables'
import ProductGridBySize from './ProductGridBySize'
import { useTranslations } from 'next-intl'

type SizeOption = {
	label: string
	size: 'S' | 'M' | 'L' | 'XL'
}

export default function SizeFeature() {
	const t = useTranslations('SizeFeature')
	const [activeSize, setActiveSize] = useState<SizeOption['size']>('S')
	const sizeOptionList: SizeOption[] = [
		{
			label: t('SmallLabel'),
			size: t('SmallSize') as 'S',
		},
		{
			label: t('MediumLabel'),
			size: t('MediumSize') as 'M',
		},
		{
			label: t('LargeLabel'),
			size: t('LargeSize') as 'L',
		},
		{
			label: t('ExtraLargeLabel'),
			size: t('ExtraLargeSize') as 'XL',
		},
	]

	return (
		<section className='section-home flex bg-primary-625-40/50'>
			<div className='container h-full'>
				<div className='grid h-full grid-cols-6 gap-comfortable'>
					<div className=' flex-col-start col-span-2 min-h-[400px] justify-center gap-cozy '>
						<h2 className='text-[3rem] text-primary-625'>{t('Title')}</h2>
						<p className='text-body-md text-primary-418'>{t('Description')}</p>
						<Link
							href={SHOP_ROUTE.SHOP_LIST.LINK}
							className='btn w-fit px-comfortable text-body-sm '
						>
							{t('ViewMore')}
						</Link>
					</div>
					<div className='col-span-4 h-fit'>
						<div className='flex-col-start items-center gap-comfortable'>
							<ul className='flex h-[4rem] w-fit items-end justify-center border-b-[1px] border-primary-5555 pb-cozy'>
								{sizeOptionList.map((opt) => (
									<li
										className='cursor-pointer px-cozy'
										key={opt.size}
										onClick={() => setActiveSize(opt.size)}
									>
										<Option
											label={opt.label}
											active={opt.size === activeSize}
										/>
									</li>
								))}
							</ul>
							<ProductGridBySize size={activeSize} />
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}

function Option({ label, active }: { label: SizeOption['label']; active: boolean }) {
	return (
		<span
			className={clsx('text-primary-5555  transition-all duration-200 ease-in-out', {
				'text-heading-1 font-semi-bold': active,
				'text-body-md font-regular': !active,
			})}
		>
			{label}
		</span>
	)
}
