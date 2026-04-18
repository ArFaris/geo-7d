import { useQuery } from '@tanstack/react-query';
import { getArticlesByCategory } from '../api/api';

export const useArticles = (params: {category: string, subcategory?: string}) => {
    return useQuery({
        queryKey: ['articles', params],
        queryFn: () => getArticlesByCategory(params),
        placeholderData: (previousData) => previousData
    })
}
