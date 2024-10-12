import React from 'react'
import { ToastContentProps, toast, ToastOptions } from 'react-toastify'
import Link from 'next/link'
import { AUTHENTICATION_ROUTE, SHOP_ROUTE } from '@/app/_configs/constants/variables'
import { useTranslations } from 'next-intl'

export const notifyRegisterSuccess = (options?: ToastOptions) => {
	toast.success(<RegisterSuccessMessage />, {
		position: 'top-center',
		onClose: options?.onClose,
	})
}
export const notifyRegisterFail = (errorMessage?: string) => {
	toast.error(<RegisterErrorMessage message={errorMessage ? errorMessage : undefined} />, {
		position: 'top-center',
	})
}
export const notifyLoginSuccess = (options?: ToastOptions) => {
	toast.success(<LoginSuccessMessage />, {
		position: 'top-center',
		onClose: options?.onClose,
	})
}
export const notifyLoginFail = (errorMessage?: string) => {
	toast.error(<LoginErrorMessage message={errorMessage ? errorMessage : undefined} />, {
		position: 'top-center',
	})
}

export const notifyResetPasswordSuccess = (options?: ToastOptions) => {
	toast.success(<ResetPasswordSuccessMessage />, {
		position: 'top-center',
		onClose: options?.onClose,
	})
}
export const notifyResetPasswordFail = (errorMessage?: string, options?: ToastOptions) => {
	toast.error(<ResetPasswordErrorMessage message={errorMessage ? errorMessage : undefined} />, {
		position: 'top-center',
		onClose: options?.onClose,
	})
}

export const notifySendEmailFail = (errorMessage?: string) => {
	toast.error(<SendEmailErrorMessage message={errorMessage ? errorMessage : undefined} />, {
		position: 'top-center',
	})
}

const RegisterSuccessMessage = () => {
	const t = useTranslations('RegisterSuccessMessage')
	return (
		<div className='flex flex-col gap-[4px] pl-compact pr-common text-body-sm'>
			<h3 className='capitalize text-primary-625'>{t('Title')}</h3>
			<p>
				{t('Moving')}{' '}
				<Link
					replace
					href={AUTHENTICATION_ROUTE.LOGIN.LINK}
					className='hover:font-bold'
				>
					{t('LoginPage')}
				</Link>
			</p>
		</div>
	)
}

const LoginSuccessMessage = () => {
	const t = useTranslations('LoginSuccessMessage')
	return (
		<div className='flex flex-col gap-[4px] pl-compact pr-common text-body-sm'>
			<h3 className='capitalize text-primary-625'>{t('Title')}</h3>
			<p>{t('Description')}</p>
		</div>
	)
}
const RegisterErrorMessage = ({ message }: { message?: string }) => (
	<div className='flex flex-col gap-[4px] pl-compact pr-common text-body-sm'>
		<h3 className='capitalize text-status-error'>{message ? message : 'Registered Failed'}</h3>
	</div>
)

const LoginErrorMessage = ({ message }: { message?: string }) => (
	<div className='flex flex-col gap-[4px] pl-compact pr-common text-body-sm'>
		<h3 className='capitalize text-status-error'>{message ? message : 'Login Failed'}</h3>
	</div>
)

const ResetPasswordSuccessMessage = () => {
	const t = useTranslations('ResetPasswordSuccessMessage')
	return (
		<div className='flex flex-col gap-[4px] pl-compact pr-common text-body-sm'>
			<h3 className='capitalize text-primary-625'>{t('Title')}</h3>
			<p>
				{t('Let')}{' '}
				<Link
					replace
					href={AUTHENTICATION_ROUTE.LOGIN.LINK}
					className='hover:font-bold'
				>
					{t('LoginNow')}
				</Link>
			</p>
		</div>
	)
}
const ResetPasswordErrorMessage = ({ message }: { message?: string }) => (
	<div className='flex flex-col gap-[4px] pl-compact pr-common text-body-sm'>
		{message ? (
			<>
				<h3 className='capitalize text-status-error'>{message}</h3>
				<p>
					This current session has been expired.{' '}
					<Link
						replace
						href={AUTHENTICATION_ROUTE.FORGOT_PASSWORD.LINK}
						className='hover:font-bold'
					>
						Resend your email.
					</Link>
				</p>
			</>
		) : (
			'Reset Password Failed'
		)}
	</div>
)

const SendEmailErrorMessage = ({ message }: { message?: string }) => (
	<div className='flex flex-col gap-[4px] pl-compact pr-common text-body-sm'>
		<h3 className='capitalize text-status-error'>{message ? message : 'Registered Failed'}</h3>
	</div>
)
