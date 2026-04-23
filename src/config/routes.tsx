import { Navigate, type RouteObject } from 'react-router';
import App from '../App';
import HomePage from 'App/pages/HomePage';
import ArticlesPage from 'App/pages/ArticlesPage';
import ArticlePage from 'App/pages/ArticlePage';
import ProfilePage from 'App/pages/ProfilePage';
import SignUpPage from 'App/pages/AuthPages/SignUpPage';
import SignInPage from 'App/pages/AuthPages/SignInPage';
import { PrivateRoute } from './privateRoute';
import AuthCallback from 'App/pages/AuthPages/Callback';
import DictionaryPage from 'App/pages/DictionaryPage';

export const routes = {
    main: {
        mask: "/",
        create: () => "/",
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
    profile: {
        mask: '/profile',
        create: () => "/profile",
    },
    auth: {
        mask: "/registration",
        create: () => `/registration`
    },
    login: {
        mask: "/login",
        create: () => `/login`
    },
    dictionary: {
        mask: "/dictionary",
        create: () => "/dictionary",
    },
    articleByCategoryDetail: {
        mask: "/content/articles/:subcategory/:id",
        create: (subcategory: string, id: string | number) => `/content/articles/${subcategory}/${id}`,
    },
    articleDetail: {
        mask: "/content/:type/:id",
        create: (type: string, id: string | number) => `/content/${type}/${id}`,
    },
    articlesByTypeAndSubcategory: {
        mask: "/content/articles/:subcategory",
        create: (subcategory: string) => `/content/articles/${subcategory}`,
    },
    articlesByType: {
        mask: "/content/:type",
        create: (type: string) => `/content/${type}`,
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
                path: routes.partners.mask,
                element: <HomePage />,
            },
            {
                path: routes.links.mask,
                element: <HomePage />,
            },
            {
                path: routes.shop.mask,
                element: <HomePage />,
            },
            {
                path: routes.about.mask,
                element: <HomePage />,
            },
            {
                path: routes.profile.mask,
                element: (
                    <PrivateRoute>
                        <ProfilePage />
                    </PrivateRoute>
                )
            },
            {
                path: routes.auth.mask,
                element: <SignUpPage />
            },
            {
                path: routes.login.mask,
                element: <SignInPage />
            },
            {
                path: '/auth/callback',
                element: <AuthCallback />
            },
            {
                path: routes.dictionary.mask,
                element: <DictionaryPage />,
            },
            {
                path: routes.articleByCategoryDetail.mask,
                element: <ArticlePage />,
            },
            {
                path: "/content/:type/:id",
                element: <ArticlePage />,
            },
            {
                path: routes.articlesByTypeAndSubcategory.mask,
                element: <ArticlesPage />,
            },
            {
                path: "/content/:type",
                element: <ArticlesPage />,
            },
        ],
    },
    {
        path: "*",
        element: <Navigate to={routes.main.mask} replace />,
    },
];
