'use client'
import { OrderData, getOrderPrice } from '@/app/_api/axios/order'
import { VARIANT_CURRENCY } from '@/app/_configs/constants/variables'
import { BanknotesIcon, CreditCardIcon } from '@heroicons/react/24/solid'
import { useQuery } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { NOT_FOUND_STATUS, UNAUTHORIZE_STATUS } from '@/app/_configs/constants/status'
import { useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'

export default function PaymentInformation({ orderId }: { orderId: OrderData['id'] }) {
	const router = useRouter()
	const orderPriceQuery = useQuery({
		queryKey: ['order', 'price', orderId],
		queryFn: () => getOrderPrice(orderId),

		onError: (e) => {
			if (e instanceof AxiosError) {
				if (
					e.code === NOT_FOUND_STATUS.toString() ||
					e.response?.status === NOT_FOUND_STATUS
				) {
					router.back()
				}

				if (
					e.code === UNAUTHORIZE_STATUS.toString() ||
					e.response?.status === UNAUTHORIZE_STATUS
				) {
					router.push('/login')
				}
			}
		},
	})

	const { data, isLoading } = orderPriceQuery

	const t = useTranslations('PaymentInformation')

	return (
		<div className='flex-col-start w-[500px] divide-y divide-primary-625 rounded-[8px] border-[2px] border-primary-625 bg-neutral-gray-1 px-comfortable py-cozy text-neutral-gray-10 shadow-15'>
			<div className='flex items-center justify-between py-cozy'>
				<CreditCardIcon className='aspect-square h-[24px] text-primary-5555' />
				<div className='flex-col-start items-end gap-compact'>
					<p className='text-body-xsm '>
						{t('AccountNumber')}
						<span className='text-body-md font-semi-bold'>12345678</span>
					</p>
					<p className='text-body-xsm '>
						{t('AccountOwnerName')}
						<span className='text-body-md font-semi-bold'>Nguyen Duong Truong Vu</span>
					</p>
					<p className='text-body-xsm '>
						{t('Bank')}
						<span className='text-body-md font-semi-bold'>MB Bank Da Nang</span>
					</p>
				</div>
			</div>
			<div className='flex items-center justify-between py-cozy'>
				<BanknotesIcon className='aspect-square h-[24px] text-primary-5555' />
				<span className='text-body-md font-semi-bold'>
					{data && data.actual_price && (
						<>
							{data?.actual_price} {VARIANT_CURRENCY}
						</>
					)}
					{isLoading && <>--</>}
				</span>
			</div>
			<div className='flex items-center justify-between py-cozy'>
				<p className='text-body-xsm font-semi-bold text-primary-5555'>
					{t('TransactionContent')}
				</p>
				<span className='text-body-md font-semi-bold'>Full Name + Order ID</span>
			</div>
		</div>
	)
}
