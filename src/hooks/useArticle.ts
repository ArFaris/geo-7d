import { useQuery } from "@tanstack/react-query";
import { getArticle } from "../api/api";

export const useArticle = (id: string) => {
    return useQuery({
        queryKey: ['article', id],
        queryFn: () => getArticle(id),
        enabled: !!id,
    })
}
