import { useQuery } from '@tanstack/react-query'
import { FilterParams } from '../_api/axios/product'
import { Sort, SortBy } from '../_config/constants/paramKeys'
import { UseQueryKeys } from '../_config/constants/queryKey'
import { getNotificationFromUser } from '../_api/axios/notification'

const defaultParams: FilterParams = {
	limit: 10,
	sort: Sort.Descending,
	sortBy: SortBy.CreatedAt,
}

export default function useNotification({
	params = {
		...defaultParams,
	},
}: {
	params?: FilterParams
}) {
	const userNotificationQuery = useQuery({
		queryKey: [UseQueryKeys.User, UseQueryKeys.Notification],
		queryFn: () => getNotificationFromUser(params),
		refetchInterval: 1000 * 60,
	})

	return { userNotificationQuery: userNotificationQuery }
}
