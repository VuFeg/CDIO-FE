import { useTranslations } from 'next-intl'
import TopReviewSlider from './TopReviewSlider'

export default function CustomerReviews() {
	const t = useTranslations('CustomerReviews')
	return (
		<section className='section-home bg-primary-580-20'>
			<div className='container'>
				<h2 className='text-center text-[2rem] capitalize text-primary-5555'>
					{t('Title')}
				</h2>
				<div>
					<TopReviewSlider />
				</div>
			</div>
		</section>
	)
}
