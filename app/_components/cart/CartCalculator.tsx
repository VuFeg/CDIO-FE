import { CartListFullDetail } from '@/app/_hooks/useCart'
import Button from '../Button'
import { useRouter } from 'next/navigation'
import { useDialogStore } from '@/app/_configs/store/useDialogStore'
import { useTranslations } from 'next-intl'

export function CartCalculator({ items }: CartListFullDetail) {
	const t = useTranslations('CartCalculator')
	const router = useRouter()
	const { closeDialog } = useDialogStore()
	const currency = items[0].variant.currency
	const totalPrice = items.reduce((accumulator, item) => {
		return accumulator + parseInt(item.variant.price) * item.quantity
	}, 0)

	const handleDirectToCheckout = () => {
		router.push('/checkout')
		closeDialog()
	}
	return (
		<>
			<div className='mb-compact flex items-center gap-comfortable'>
				<span className='flex-1 text-body-sm'>{t('Subtotal')}</span>
				<span className='text-body-lg font-semi-bold'>
					{totalPrice} {currency}
				</span>
			</div>
			<Button
				type='button'
				onClick={handleDirectToCheckout}
				className='w-full'
			>
				{t('Checkout')}
			</Button>
		</>
	)
}
