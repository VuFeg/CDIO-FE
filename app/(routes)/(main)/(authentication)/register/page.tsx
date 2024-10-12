import { AUTHENTICATION_ROUTE } from '@/app/_configs/constants/variables'
import RegisterForm from './RegisterForm'
import Link from 'next/link'
import { useTranslations } from 'next-intl'

export default function RegisterPage() {
	const t = useTranslations('RegisterPage')
	return (
		<>
			<div className='flex-col-start gap-common'>
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
				<RegisterForm />
				<span className='text-center text-body-md'>
					{t('HaveAccount')}{' '}
					<Link
						replace
						href={AUTHENTICATION_ROUTE.LOGIN.LINK}
					>
						{t('SignIn')}
					</Link>
				</span>
			</div>
		</>
	)
}
