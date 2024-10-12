import {
	getOrderFullDetailAsAdministratorById,
	OrderState,
	updateOrderStatus,
	updateOrderStatusSendNoti,
} from '@/app/_api/axios/admin/order'
import { Dropdown } from '@/app/_components/dropdown'
import { ADMIN_ACCESS_TOKEN_COOKIE_NAME } from '@/app/_configs/constants/cookies'
import { ORDER_STATE_FIELD } from '@/app/_configs/constants/variables'
import { useQueryClient, useMutation, useQuery } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { getCookie } from 'cookies-next'
import { useState, useEffect } from 'react'
import { notifyUpdateCancelSuccess } from './Notification'
import { ADMIN_QUERY_KEY, UseQueryKeys } from '@/app/_configs/constants/queryKey'
import { notifyError } from '../../../(customer)/user/setting/profile/Notification'
import useOrderUpdateDialog from '@/app/_hooks/dialog/useOrderUpdateDialog'
import createNotificationMessage from '@/app/_hooks/useOrderNotificationMessage'
import { updateVariant } from '@/app/_api/axios/admin/product'
import { notifyUpdateVariantSuccess } from '../product/Notifications'
import { getOrderFullDetailById } from '@/app/_api/axios/order'
import {
	getProductDetailById,
	getVariantById,
	getVariantsByProductId,
} from '@/app/_api/axios/product'

export default function OrderDropdownState({ order }: { order: OrderState }) {
	const [state, setState] = useState(order.state)
	const [currentOrderId, setCurrentOrderId] = useState('')
	const adminAccessToken = getCookie(ADMIN_ACCESS_TOKEN_COOKIE_NAME)?.toString()
	const { openOrderUpdateDialog } = useOrderUpdateDialog({ order: order })
	const states = ORDER_STATE_FIELD
	const queryClient = useQueryClient()

	// console.log(order)

	useEffect(() => {
		setState(order.state)
	}, [order.state])

	var stateList: { [key: string]: string[] } = {
		draft: [states.processing.state, states.cancelled.state],
		processing: [states.completed.state, states.cancelled.state],
		completed: [],
		cancelled: [],
	}

	const updateOrderStatusComplete = useMutation({
		mutationFn: updateOrderStatusSendNoti,
		onSuccess: () => {
			notifyUpdateCancelSuccess(order.order_id, states.completed.state)
			queryClient.invalidateQueries({ queryKey: [ADMIN_QUERY_KEY, UseQueryKeys.Order] })
		},
		onError: (e) => {
			if (e instanceof AxiosError) {
				notifyError(e.response?.data.msg)
			}
		},
	})

	const orderQuery = useQuery({
		queryKey: [ADMIN_QUERY_KEY, UseQueryKeys.Order, currentOrderId],
		queryFn: () => getOrderFullDetailAsAdministratorById(currentOrderId),
	})

	const { data } = orderQuery
	// console.log(data)

	const handleOnSelect = async (value: string) => {
		if (value === states.processing.state) {
			// open modal => full fill paid at => update
			setCurrentOrderId(order.order_id)
			data?.productList.map(async (product) => {
				const variant = await getVariantById(product.variant_id)
				await updateVariant({
					variantData: {
						id: variant.items.id,
						product_id: variant.items.product,
						name: variant.items.name,
						price: parseInt(variant.items.price),
						image: variant.items.image,
						quantity: parseInt(variant.items.quantity) - product.quantity,
						available: variant.items.available, // or appropriate value
						color: variant.items.color, // or appropriate value
						color_name: variant.items.color_name, // or appropriate value
						description: variant.items.description, // or appropriate value
						currency: variant.items.currency, // or appropriate value
						is_default: true, // or appropriate value
					},
					adminAccessToken: adminAccessToken,
				})
			})
			openOrderUpdateDialog('processing')
		}

		if (value === states.cancelled.state) {
			// update status => create message => send message to user
			openOrderUpdateDialog('cancel')
		}

		if (value === states.completed.state) {
			const notificationMessage = createNotificationMessage(
				order.order_id,
				ORDER_STATE_FIELD.completed.state,
			)

			updateOrderStatusComplete.mutate({
				adminAccessToken: adminAccessToken!,
				orderId: order.order_id,
				state: states.completed.state,
				//NOTE: full fill message, title for processing state
				message: notificationMessage.message,
				title: notificationMessage.title,
				userId: order.owner_id,
			})
		}
	}

	const baseInputStyle = 'border-0 w-full text-white capitalize text-base '
	return (
		<>
			<Dropdown
				data={stateList[state]}
				value={state}
				onSelect={handleOnSelect}
				inputStyle={
					state === states.draft.state
						? baseInputStyle + 'bg-order-status-draft'
						: state === states.processing.state
						? baseInputStyle + 'bg-order-status-processing'
						: state === states.completed.state
						? baseInputStyle + 'bg-order-status-completed'
						: baseInputStyle + 'bg-order-status-cancelled'
				}
				dropdownContainerStyle={'bg-white'}
			/>
		</>
	)
}
