'use client'
import { useForm, SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
	ResetPasswordFormInputType,
	ResetPasswordSchema,
} from '@/app/_configs/schemas/authentication'
import { useMutation } from '@tanstack/react-query'
import { resetPassword } from '@/app/_api/axios/authentication'
import { AxiosError } from 'axios'
import { notifyResetPasswordFail, notifyResetPasswordSuccess } from '../Notification'
import { TextField } from '@/app/_components/form'
import Button from '@/app/_components/Button'
import { useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'

export default function ResetPasswordForm({ resetPasswordToken }: { resetPasswordToken: string }) {
	const t = useTranslations('ResetPasswordForm')
	const router = useRouter()
	const defaultInputValues: ResetPasswordFormInputType = {
		password: '',
		passwordConfirm: '',
	}

	//NOTE: Validation with useForm
	const {
		reset,
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<ResetPasswordFormInputType>({
		mode: 'onBlur',
		reValidateMode: 'onBlur',
		resolver: zodResolver(ResetPasswordSchema),
		defaultValues: defaultInputValues,
	})

	const resetPasswordMutation = useMutation({
		//NOTE: The callback used for the mutation
		mutationFn: resetPassword,
		//NOTE: Execuse after receiving suscess responses
		onSuccess: () => {
			reset()
			notifyResetPasswordSuccess({ onClose: () => router.push('/login') })
		},
		//NOTE: Execuse after receving failure responses
		onError: (e) => {
			if (e instanceof AxiosError) {
				notifyResetPasswordFail(e.response?.data.msg || e.message, {
					onClose: () => router.push('/forgot-password'),
				})
			}
		},
	})

	const onSubmitHandler: SubmitHandler<ResetPasswordFormInputType> = (values, e) => {
		e?.preventDefault()
		//NOTE: Execute the Mutation
		resetPasswordMutation.mutate({
			password: values.password,
			token: resetPasswordToken,
		})
	}

	return (
		<>
			<form
				onSubmit={handleSubmit(onSubmitHandler)}
				className='flex w-full flex-col gap-cozy text-body-sm'
			>
				<TextField
					type='password'
					label={t('NewPasswordLabel')}
					placeholder={t('NewPasswordPlaceholder')}
					register={register('password')}
					error={Boolean(errors?.password)}
					helperText={errors?.password?.message}
				/>
				<TextField
					type='password'
					label={t('ConfirmPasswordLabel')}
					placeholder={t('ConfirmPasswordPlaceholder')}
					register={register('passwordConfirm')}
					error={Boolean(errors?.passwordConfirm)}
					helperText={errors?.passwordConfirm?.message}
				/>
				<Button
					type='submit'
					disabled={resetPasswordMutation.isLoading}
				>
					{resetPasswordMutation.isLoading ? t('Sending') : t('ResetPassword')}
				</Button>
			</form>
		</>
	)
}
