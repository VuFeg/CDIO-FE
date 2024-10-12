import Link from 'next/link'
import ForgotPasswordForm from './ForgotPasswordForm'
import { AUTHENTICATION_ROUTE } from '@/app/_configs/constants/variables'
import { useTranslations } from 'next-intl'

export default function RegisterPage() {
	const t = useTranslations('ForgotPasswordPage')
	return (
		<>
			<div className='flex-col-start h-full justify-center gap-common'>
				<div>
					<div className='flex-col-start gap-[4px]'>
						<h1>{t('Title')}</h1>
						<p className='text-body-md'>{t('Description')}</p>
					</div>
				</div>
				<ForgotPasswordForm />
				<span className='text-center text-body-md'>
					{t('HaveAccount')}{' '}
					<Link
						replace
						href={AUTHENTICATION_ROUTE.REGISTER.LINK}
					>
						{t('SignInNow')}
					</Link>
				</span>
			</div>
		</>
	)
}
