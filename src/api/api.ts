import supabase from 'lib/Supabase';
import type { Articles, Article } from 'types/articles';

export const getArticlesByCategory = async ({category, subcategory}: {category: string, subcategory?: string}): Promise<Articles[]> => {
    let query = supabase
                    .from('articles')
                    .select('id, title, part')
                    .eq('category', category)
                    .order('created_at', {ascending: false});

    if (subcategory) {
        query = query.eq('subcategory', subcategory);
    }
    console.log(category, subcategory)
    console.log(query)
    const { data, error } = await query;

    if (error) throw new Error(error.message);

    return data.map(item => ({
        name: item.title,
        slug: item.id,
        part: item.part || undefined
    }));
}

export const getArticle = async (id: string): Promise<Article>  => {
    let query = supabase
                    .from('articles')
                    .select('*')
                    .eq('id', id)
                    
    const { data, error } = await query;

    console.log(data)

    if (error) throw new Error(error.message);

    return {
        name: data[0].title,
        slug: data[0].id,
        part: data[0].part || undefined,
        createdAt: data[0].created_at,
        readingTime: data[0].reading_time,
        views: data[0].views,
        likes: data[0].likes,
        category: data[0].category,
        subcategory: data[0].subcategory,
        pdfPath: data[0].pdf_path || null
    }
}

export const getPdfUrl = async (pdfPath: string): Promise<string | null> => {
    const { data, error } = await supabase.storage
                                    .from('articles')
                                    .createSignedUrl(pdfPath, 60);

        if (error) {
            console.error('Supabase error:', error);
            return null;
        }

    return data?.signedUrl;
}
