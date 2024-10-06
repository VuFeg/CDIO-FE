import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useDialogStore } from '@/app/_config/store/useDialogStore'

export default function ModalProvider({ children }: { children: React.ReactNode }) {
	const { activeDialog } = useDialogStore()
	return (
		<div className='relative min-h-screen'>
			<AnimatePresence>
				{activeDialog && (
					<motion.div
						initial={{
							opacity: 0,
						}}
						animate={{ opacity: 1 }}
						exit={{
							opacity: 0,
						}}
						transition={{ ease: 'easeIn', duration: 0.25 }}
						className='absolute inset-0 z-[100] bg-primary-418/40'
					>
						{activeDialog}
					</motion.div>
				)}
			</AnimatePresence>
			{children}
		</div>
	)
}
