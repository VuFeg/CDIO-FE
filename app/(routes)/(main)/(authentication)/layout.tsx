import { ReactNode } from 'react'
import { Metadata } from 'next'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import NavBarAuthentication from './page'

export const metadata: Metadata = {
	title: 'Create An Account',
	description: 'Be a member by creating an account',
}
export default function AuthenticationLayout({ children }: { children: ReactNode }) {
	const t = useTranslations('AuthenticationLayout')

	return (
		<div className='flex-center h-screen w-screen bg-primary-5555-20'>
			<div className='container grid h-full grid-cols-2 overflow-hidden  bg-white  p-cozy  shadow-30'>
				<div className='relative flex h-full flex-col gap-cozy overflow-auto p-comfortable'>
					<NavBarAuthentication />
					<div className='mx-auto h-full w-[70%] max-w-full'>{children}</div>
				</div>
				<div className='aspect-auto h-full overflow-hidden rounded-lg'>
					<Image
						width={0}
						height={0}
						sizes='100vw'
						src='https://static.vecteezy.com/system/resources/previews/018/815/357/original/green-tropical-forest-background-monstera-leaves-palm-leaves-branches-exotic-plants-background-for-banner-template-decor-postcard-abstract-foliage-and-botanical-wallpaper-vector.jpg'
						alt='plants art'
					/>
				</div>
			</div>
		</div>
	)
}
