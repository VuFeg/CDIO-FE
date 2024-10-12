import { MinusIcon, PlusIcon } from '@heroicons/react/24/solid'
import { VariantData } from '../_api/axios/product'

type QuantityControllerProps = {
	quantity: number
	variant: VariantData
	decrease: () => void
	increase: () => void
}
export default function QuantityController({
	quantity = 1,
	variant,
	decrease,
	increase,
}: QuantityControllerProps) {
	return (
		<div className='flex h-fit items-center rounded-[4px] border-[1px] border-primary-625-40 text-body-xsm'>
			<button
				className='rounded-[4px] p-[8px] hover:bg-primary-5555/10'
				onClick={decrease}
			>
				<MinusIcon className='aspect-square h-[12px]' />
			</button>
			<span className='px-[8px]'>{quantity}</span>
			<button
				className={`${
					quantity === Number(variant.quantity) && 'cursor-not-allowed opacity-30'
				} rounded-[4px] p-[8px] hover:bg-primary-5555/10`}
				onClick={increase}
				disabled={quantity === Number(variant.quantity)}
			>
				<PlusIcon className='aspect-square h-[12px]' />
			</button>
		</div>
	)
}
