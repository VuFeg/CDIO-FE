import Link from 'next/link'
import LoginForm from './LoginForm'
import { AUTHENTICATION_ROUTE } from '@/app/_configs/constants/variables'
import { useTranslations } from 'next-intl'

export default function RegisterPage() {
	const t = useTranslations('LoginPage')
	return (
		<>
			<div className='flex h-full flex-col items-center justify-center gap-common'>
				<div>
					<span className='mb-compact block text-body-lg'>
						{t('Welcome')} <span className=' text-heading-2 font-bold'>GreenDeco</span>{' '}
						👋
					</span>
					<div className='flex-col-start gap-[4px]'>
						<h1>{t('Title')}</h1>
						<p className='text-body-md'>{t('Description')}</p>
					</div>
				</div>
				<LoginForm />
				<span className='text-center text-body-md'>
					{t('DontHaveAccount')}{' '}
					<Link
						replace
						href={AUTHENTICATION_ROUTE.REGISTER.LINK}
					>
						{t('SignUp')}
					</Link>
				</span>
			</div>
		</>
	)
}
