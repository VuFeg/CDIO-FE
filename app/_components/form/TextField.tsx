import * as React from 'react'
import { FormControl, FormControlProps } from '@mui/base/FormControl'
import clsx from 'clsx'
import { UseFormRegisterReturn } from 'react-hook-form'
import { Input } from './Input'

type CustomFormControlProps<T> = Partial<T> & {
	label?: string
	helperText?: string
	placeholder?: string
	type?: React.HTMLInputTypeAttribute
	register?: UseFormRegisterReturn
}

export function TextField(props: CustomFormControlProps<FormControlProps>) {
	const {
		className,
		label,
		helperText,
		type,
		required,
		value,
		error,
		disabled,
		defaultValue,
		register,
		...otherFormControlProps
	} = props

	return (
		<>
			<FormControl
				{...otherFormControlProps}
				disabled={disabled}
				error={error}
				className={clsx('flex flex-col gap-compact', className)}
			>
				{label && (
					<label className='font-bold'>
						{label} {required ? '*' : ''}
					</label>
				)}
				<Input
					type={type}
					className='w-full'
					value={value}
					error={error}
					disabled={disabled}
					defaultValue={defaultValue}
					{...register}
				/>
				{helperText && <p className={clsx({ 'text-status-error': error })}>{helperText}</p>}
			</FormControl>
		</>
	)
}
