import { Navigate, type RouteObject } from 'react-router';
import App from '../App';
import HomePage from 'App/pages/HomePage';
import ArticlesPage from 'App/pages/ArticlesPage';
import ArticlePage from 'App/pages/ArticlePage';
import LinksPage from 'App/pages/LinksPage';

export const routes = {
    main: {
        mask: "/",
        create: () => "/",
    },
    news: {
        mask: "/news",
        create: () => "/news",
    },
    newsDetail: {
        mask: "/news/:id",
        create: (id: string | number) => `/news/${id}`,
    },
    reviews: {
        mask: "/reviews",
        create: () => "/reviews",
    },
    reviewDetail: {
        mask: "/reviews/:id",
        create: (id: string | number) => `/reviews/${id}`,
    },
    analytics: {
        mask: "/analytics",
        create: () => "/analytics",
    },
    analyticsDetail: {
        mask: "/analytics/:id",
        create: (id: string | number) => `/analytics/${id}`,
    },
    articles: {
        mask: "/articles",
        create: () => "/articles",
    },
    vestnik: {
        mask: "/articles/vestnik",
        create: () => "/articles/vestnik",
    },
    vestnikDetail: {
        mask: "/articles/vestnik/:id",
        create: (id: string | number) => `/articles/vestnik/${id}`,
    },
    otherArticles: {
        mask: "/articles/other",
        create: () => "/articles/other",
    },
    otherArticleDetail: {
        mask: "/articles/other/:id",
        create: (id: string | number) => `/articles/other/${id}`,
    },
    partners: {
        mask: "/partners",
        create: () => "/partners",
    },
    links: {
        mask: "/links",
        create: () => "/links",
    },
    shop: {
        mask: "/shop",
        create: () => "/shop",
    },
    about: {
        mask: "/about",
        create: () => "/about",
    },
};

export const routesConfig: RouteObject[] = [
    {
        path: routes.main.mask,
        element: <App />,
        children: [
            {
                index: true,
                element: <HomePage />,
            },
            {
                path: routes.news.mask,
                element: <ArticlesPage category='news'/>,
            },
            {
                path: routes.newsDetail.mask,
                element: <ArticlePage />,
            },
            {
                path: routes.reviews.mask,
                element: <ArticlesPage category='reviews'/>,
            },
            {
                path: routes.reviewDetail.mask,
                element: <ArticlePage />,
            },
            {
                path: routes.analytics.mask,
                element: <ArticlesPage category='analytics'/>,
            },
            {
                path: routes.analyticsDetail.mask,
                element: <ArticlePage />,
            },
            {
                path: routes.articles.mask,
                element: <ArticlesPage category='articles' subcategory='vestnik'/>,
            },
            {
                path: routes.vestnik.mask,
                element: <ArticlesPage category='articles' subcategory='vestnik'/>,
            },
            {
                path: routes.otherArticles.mask,
                element: <ArticlesPage category='articles' subcategory='other'/>,
            },
            {
                path: routes.vestnikDetail.mask,
                element: <ArticlePage />,
            },
            {
                path: routes.otherArticleDetail.mask,
                element: <ArticlePage />,
            },
            {
                path: routes.partners.mask,
                element: <LinksPage />,
            },
            {
                path: routes.links.mask,
                element: <LinksPage />,
            },
            {
                path: routes.shop.mask,
                element: <HomePage />,
            },
            {
                path: routes.about.mask,
                element: <HomePage />,
            },
        ],
    },
    {
        path: "*",
        element: <Navigate to={routes.main.mask} replace />,
    },
];
