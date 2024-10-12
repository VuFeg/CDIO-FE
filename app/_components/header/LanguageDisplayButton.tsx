'use client'
import { GlobeAsiaAustraliaIcon } from '@heroicons/react/24/solid'
import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslations } from 'next-intl'
import setLanguageValue from '@/app/_actions/SetLanguageAction'

export const LanguageDisplayButton = () => {
	const t = useTranslations('LanguageDisplayButton')
	const [open, setOpen] = useState(false)
	return (
		<div>
			<button
				onClick={() => setOpen(!open)}
				className='group rounded-xl border-[1px] border-primary-5555-40 bg-primary-5555-20/40 px-[8px] py-[4px] text-primary-625 transition duration-75 ease-in hover:bg-primary-625 hover:text-neutral-gray-1'
			>
				<GlobeAsiaAustraliaIcon className='aspect-square h-[24px] ' />
			</button>
			<AnimatePresence>
				{open && (
					<motion.div
						initial={{
							translateY: '-16px',
							opacity: 0,
							right: '0',
							// translateX: '-50%',
						}}
						animate={{ opacity: 1, translateY: 0 }}
						exit={{
							opacity: 0,
							translateY: '-16px',
						}}
						transition={{ ease: 'easeInOut', duration: 0.2 }}
						className='absolute top-[calc(100%+8px)] justify-center overflow-y-auto rounded-xl bg-white  shadow-38'
					>
						<div className='flex flex-col border-primary-5555-40 bg-primary-5555-20/40 px-2 py-4'>
							<button
								onClick={() => setLanguageValue('en')}
								className='px-1 py-2 text-primary-625 transition duration-75 ease-in hover:opacity-50'
							>
								{t('English')}
							</button>
							<button
								onClick={() => setLanguageValue('vi')}
								className='px-1 py-2 text-primary-625 transition duration-75 ease-in hover:opacity-50'
							>
								{t('Vietnamese')}
							</button>
						</div>
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	)
}
