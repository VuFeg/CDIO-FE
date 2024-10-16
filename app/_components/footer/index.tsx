import { SHOP_ROUTE } from '@/app/_configs/constants/variables'
import Link from 'next/link'
import BrandLogoFullWhite from '@/public/BrandLogoFullWhite.svg'
import FacebookIcon from '@/app/_assets/images/facebooklogo.svg'
import LinkedinIcon from '@/app/_assets/images/linkedinlogo.svg'
import Image from 'next/image'
import { useTranslations } from 'next-intl'

export default function Footer() {
	return (
		<footer className='bg-primary-5555'>
			<div className='container'>
				<div className='pb-[40px] pt-[60px]'>
					<Heading />
					<Contact />
				</div>
			</div>
		</footer>
	)
}

function Heading() {
	const t = useTranslations('FooterHeading')

	return (
		<div className='flex-col-start items-center gap-comfortable'>
			<h2 className='text-[3.6rem] font-semi-bold italic text-neutral-gray-1'>
				{t('Title')}
			</h2>
			<div className='flex-col-start gap-cozy'>
				<div className='flex items-center gap-compact text-white'>
					<p className='text-body-md font-semi-bold'>{t('Description')}</p>
					<span className='text-body-sm italic'>{t('Author')}</span>
				</div>
				<div className='flex items-center justify-center gap-cozy'>
					<Link
						className='btn rounded-[50px] bg-neutral-gray-1 px-comfortable py-compact font-semi-bold text-primary-5555 hover:font-bold'
						href={SHOP_ROUTE.SHOP_LIST.LINK}
					>
						{t('ShopAllPlant')}
					</Link>
					<Link
						className='btn rounded-[50px] bg-neutral-gray-1 px-comfortable py-compact font-semi-bold text-primary-5555 hover:font-bold'
						href={'/'}
					>
						{t('AboutUs')}
					</Link>
				</div>
			</div>
		</div>
	)
}

function Logo() {
	return (
		<Link
			href={'/'}
			className='relative inline-block h-[40px] w-[25%]  overflow-hidden  '
		>
			<Image
				src={BrandLogoFullWhite}
				alt='Welcome to GreenDeco'
				width={0}
				height={0}
				sizes='100vw'
			/>
		</Link>
	)
}

function Contact() {
	const t = useTranslations('FooterContact')

	return (
		<div className='relative mt-comfortable flex items-center justify-between border-t-[1px]  border-primary-5555-20 py-comfortable'>
			<Logo />
			<span className='absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] text-body-sm text-white'>
				{t('CopyRight')}
			</span>
			<div className='flex items-center gap-compact'>
				<span className='aspect-square h-[40px] rounded-[100%] bg-neutral-gray-1 p-compact'>
					<Image
						src={FacebookIcon}
						alt='contact us'
						width={0}
						height={0}
						sizes='100vw'
					/>
				</span>
				<span className='aspect-square h-[40px] rounded-[100%] bg-neutral-gray-1 p-compact'>
					<Image
						src={LinkedinIcon}
						alt='contact us'
						width={0}
						height={0}
						sizes='100vw'
					/>
				</span>
			</div>
		</div>
	)
}
