'use client'
import { ClipboardDocumentListIcon, ShoppingBagIcon } from '@heroicons/react/24/solid'
import Link from 'next/link'
import PaymentInformation from './PaymentInformation'
import { USER_SETTING_ROUTE } from '@/app/_configs/constants/variables'
import VNPayButton from '@/app/_components/paymentButton/VNPayButton'
import { FUNDING } from '@paypal/react-paypal-js'
import {
	PayPalScriptProvider,
	PayPalButtons,
	usePayPalScriptReducer,
} from '@paypal/react-paypal-js'
import { createPaypalPayment, paypalOnApprove } from '@/app/_api/axios/payment'
import { CreateOrderData, CreateOrderActions } from '@paypal/paypal-js/types/components/buttons'
import { OrderData } from '@/app/_api/axios/order'
import { useTranslations } from 'next-intl'

export default function PaymentPage({
	params: { orderId },
}: {
	params: {
		orderId: string
	}
}) {
	const t = useTranslations('PaymentPage')
	return (
		<div className='flex-col-start h-full items-center  gap-cozy'>
			<p className=' text-heading font-bold text-primary-625'>
				{t('Title')}
				<span className='text-[3rem]'>🫶 🥰</span>
			</p>
			<div className='flex gap-comfortable'>
				<PaymentGuide orderId={orderId} />
				<div className='flex-col-start gap-cozy'>
					<div className='flex justify-between gap-cozy'>
						<div className='flex-1'>
							<VNPayButton id={orderId} />
						</div>
						<div className='flex-1'>
							<PayPalScriptProvider
								deferLoading={false}
								options={{
									clientId: `${process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID}`,
								}}
							>
								<PayPalButtons
									createOrder={() => createPaypalPayment(orderId)}
									onApprove={paypalOnApprove}
									fundingSource={FUNDING.PAYPAL}
									style={{ color: 'silver', label: 'buynow' }}
								/>
							</PayPalScriptProvider>
						</div>
					</div>
					<PaymentInformation orderId={orderId} />
				</div>
			</div>
		</div>
	)
}

const PaymentGuide = ({ orderId }: { orderId: string }) => {
	const t = useTranslations('PaymentGuide')
	return (
		<div className='flex-col-start h-full  justify-center gap-cozy  '>
			<div className='text-center text-neutral-gray-10'>
				<p className='text-body-sm'>{t('Title')}</p>
				<p className='text-body-lg font-semi-bold'>{orderId}</p>
			</div>
			<div className='flex-col-start gap-[4px] text-center text-neutral-gray-10'>
				<p className=' text-body-sm'>{t('Description')}</p>
				<p className='text-body-sm'>
					{t('Content1')}
					<span className='font-bold text-status-success'>{t('Content2')}</span>
					{t('Content3')}
					<span className='font-bold text-status-error'>{t('Content4')}</span>
				</p>
				<p className='mb-[4px] text-body-sm'>{t('Notification')}</p>
			</div>
			<div className='w-full text-center'>
				<div className='flex w-full gap-cozy'>
					<Link
						href={'/'}
						replace
						className='btn flex-1'
					>
						<span className='flex items-center justify-center gap-compact font-semi-bold'>
							<ShoppingBagIcon className='aspect-square h-[24px]' />
							{t('BackToShopping')}
						</span>
					</Link>
					<Link
						className='btn btnSecondary flex-1'
						replace
						href={USER_SETTING_ROUTE.ORDER.LINK}
					>
						<span className='flex items-center justify-center gap-compact font-semi-bold'>
							{t('ViewOrderList')}
							<ClipboardDocumentListIcon className='aspect-square h-[24px]' />
						</span>
					</Link>
				</div>
			</div>
		</div>
	)
}
