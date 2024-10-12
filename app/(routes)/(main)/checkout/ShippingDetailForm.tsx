'use client'
import { useForm, SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
	ShippingAddressSchema,
	ShippingAddressFormInputType,
} from '@/app/_configs/schemas/shippingAddress'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { CreateOrderResponseData, createOrder } from '@/app/_api/axios/order'
import axios, { AxiosError } from 'axios'
import { deleteCookie } from 'cookies-next'
import { useRouter } from 'next/navigation'
import { NOT_FOUND_STATUS, UNAUTHORIZE_STATUS } from '@/app/_configs/constants/status'
import { TextField } from '@/app/_components/form'
import Button from '@/app/_components/Button'
import { UseQueryKeys } from '@/app/_configs/constants/queryKey'
import { updateVariant } from '@/app/_api/axios/admin/product'
import { CartItemWithFullVariantInfo } from '@/app/_hooks/useCart'
import { useTranslations } from 'next-intl'

interface ShippingDetailFormProps {
	items: CartItemWithFullVariantInfo[]
}

export default function ShippingDetailForm({ items }: ShippingDetailFormProps) {
	console.log(items)
	const router = useRouter()
	const queryClient = useQueryClient()
	const defaultInputValues: ShippingAddressFormInputType = {
		city: '',
		district: '',
		ward: '',
		address: '',
	}

	//NOTE: Validation with useForm
	const {
		reset,
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<ShippingAddressFormInputType>({
		mode: 'onBlur',
		reValidateMode: 'onBlur',
		resolver: zodResolver(ShippingAddressSchema),
		defaultValues: defaultInputValues,
	})

	const handleCreateOrderSuccess = (data: CreateOrderResponseData) => {
		const { id } = data
		reset()
		router.replace(`/payment/${id}`)
		deleteCookie('cartId')
		queryClient.invalidateQueries([UseQueryKeys.User, 'cart'], {
			exact: true,
		})
	}

	const createOrderMutation = useMutation({
		//NOTE: The callback used for the mutation
		mutationFn: createOrder,
		//NOTE: Execuse after receiving suscess responses
		onSuccess: (data) => handleCreateOrderSuccess(data.data),
		//NOTE: Execuse after receving failure responses
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

	const handleJoiningValues = (values: ShippingAddressFormInputType) => {
		const { city, ward, district, address } = values
		const cityWithLabel = city.toLowerCase().includes('city') ? city : `${city} City`
		const wardWithLabel = ward.toLowerCase().includes('city') ? ward : `${ward} Ward`
		const districtWithLabel = district.toLowerCase().includes('district')
			? district
			: `District ${district}`
		return `${address}, ${wardWithLabel}, ${districtWithLabel}, ${cityWithLabel}`
	}

	const onSubmitHandler: SubmitHandler<ShippingAddressFormInputType> = (values, e) => {
		e?.preventDefault()
		//NOTE: Execute the Mutation
		const shippingAddress = handleJoiningValues(values)

		items.forEach((item) => {
			const { price, color_name, quantity, image, product, ...restValues } = item.variant

			updateVariant({
				variantData: {
					id: item.variant.id,
					product_id: product,
					name: `${item.variant.name} ${color_name}`,
					color_name: color_name,
					price: parseInt(price),
					image: image,
					currency: item.variant.currency,
					quantity: parseInt(quantity) - item.quantity,
					available: true, // or any appropriate value
					color: item.variant.color,
					description: item.variant.description, // or any appropriate value
					is_default: false, // or any appropriate value
				},
				adminAccessToken:
					'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbiI6dHJ1ZSwiZXhwIjoxNzI4NjMwOTI0LCJ1c2VyX2lkIjoiN2FlZWE3MjYtMDkwOS00ZGQ4LWFjOTctNDhiMTVlZjM3NGY2In0.QlwaAu7BOLSRJqz-UJm8ymRbyiu2RsqHjsKkeWKQt2M',
			})
		})

		createOrderMutation.mutate({
			shipping_address: shippingAddress,
		})
	}

	const t = useTranslations('ShippingDetailForm')
	return (
		<>
			<h2 className='text-body-lg font-semi-bold text-neutral-gray-10'>{t('Title')}</h2>
			<div className='flex-col-start gap-cozy rounded-[8px] bg-neutral-gray-1 p-comfortable shadow-38'>
				<form
					onSubmit={handleSubmit(onSubmitHandler)}
					className='flex-col-start gap-cozy'
				>
					<div className='grid grid-cols-2 gap-cozy text-body-sm'>
						<div>
							<TextField
								type='text'
								label={t('CityLabel')}
								placeholder={t('CityPlaceholder')}
								register={register('city')}
								error={Boolean(errors?.city)}
								helperText={errors?.city?.message}
							/>
						</div>
						<div>
							<TextField
								type='text'
								label={t('DistrictLabel')}
								placeholder={t('DistrictPlaceholder')}
								register={register('district')}
								error={Boolean(errors?.district)}
								helperText={errors?.district?.message}
							/>
						</div>
						<div>
							<TextField
								type='text'
								label={t('WardLabel')}
								placeholder={t('WardPlaceholder')}
								register={register('ward')}
								error={Boolean(errors?.ward)}
								helperText={errors?.ward?.message}
							/>
						</div>
						<div>
							<TextField
								type='text'
								label={t('AddressLabel')}
								placeholder={t('AddressPlaceholder')}
								register={register('address')}
								error={Boolean(errors?.address)}
								helperText={errors?.address?.message}
							/>
						</div>
					</div>
					<Button
						type='submit'
						disabled={createOrderMutation.isLoading}
					>
						{createOrderMutation.isLoading ? t('Processing') : t('PlaceOrder')}
					</Button>
				</form>
			</div>
		</>
	)
}
