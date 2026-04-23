import supabase from 'lib/Supabase';
import type { Articles, Article } from 'types/articles';

export const getArticlesByCategory = async ({category, subcategory}: {category: string, subcategory?: string}): Promise<Articles[]> => {
    let query = supabase
                    .from('articles')
                    .select('id, title, title_en, part')
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
        name_en: item.title_en,
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
        name_en: data[0].title_en,
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

export const loginUser = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) throw new Error(error.message);

    return data;
}

export const registerUser = async (name: string, email: string, password: string) => {
    const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
            data: { name },
            emailRedirectTo: 'https://geo-7d.vercel.app/auth/callback'
        }
    });

    if (error) throw new Error(error.message);

    return data;
}

export const updateUser = async (params: {
    name?: string;
    email?: string;
    password?: string;
}) => {
    const { data, error } = await supabase.auth.updateUser({
        email: params.email,
        password: params.password,
        data: params.name ? { name: params.name } : undefined
    });

    if (error) throw new Error(error.message);

    return data;
}

export const signOutUser = async () => {
    const { error } = await supabase.auth.signOut();

    if (error) throw new Error(error.message);
}
