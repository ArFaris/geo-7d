import React, { useState, useRef, useEffect} from 'react';
import { useNavigate } from 'react-router';
import Text from 'components/Text';
import s from './Header.module.scss';
import Button from 'components/Button';
import SearchIcon from 'components/icons/SearchIcon';
import BurgerMenu from './componenets/BurgerMenu';
import useBurgerMenu from 'hooks/useBurgerMenu';
import MenuIcon from 'components/icons/MenuIcon';
import cn from 'classnames';
import LanguageSwitcher from 'components/LanguageSwitcher';
import { useLanguage } from 'contexts/LanguageContext';

export type Link = {
    key: string,
    to: string
}

const navKeys: Link[] = [
  { key: 'nav.home', to: '/' },
  { key: 'nav.news', to: '/news' },
  { key: 'nav.reviews', to: '/reviews' },
  { key: 'nav.analytics', to: '/analytics' },
  { key: 'nav.articles', to: '/articles' },
  { key: 'nav.partners', to: '/partners' },
  { key: 'nav.sources', to: '/links' },
  { key: 'nav.shop', to: '/shop' },
  { key: 'nav.about', to: '/about' }
];

type HeaderProps = {
    image?: string,
    links?: Link[]
}

const Header: React.FC<HeaderProps> = ({image='/logo.svg', links=navKeys}: HeaderProps) => {
    const { isOpen, close, open } = useBurgerMenu();
    const [isSecondLevelVisible, setIsSecondLevelVisible] = useState(true);
    const lastScrollY = useRef(0);
    const frameId = useRef<number>(0);
    const { t } = useLanguage();
    const navigate = useNavigate();

    useEffect(() => {
        const handleScroll = () => {
            if (frameId.current) {
                cancelAnimationFrame(frameId.current);
            }
            
            frameId.current = requestAnimationFrame(() => {
                const currentScrollY = window.scrollY;
                
                if (currentScrollY === 0) {
                    setIsSecondLevelVisible(true);
                } else if (currentScrollY > lastScrollY.current && currentScrollY > 50) {
                    setIsSecondLevelVisible(false);
                } else if (currentScrollY < lastScrollY.current) {
                    setIsSecondLevelVisible(true);
                }
                
                lastScrollY.current = currentScrollY;
            });
        };
        
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => {
            window.removeEventListener('scroll', handleScroll);
            if (frameId.current) {
                cancelAnimationFrame(frameId.current);
            }
        };
    }, []);

    return (
        <>
            <div className={s.header}>
                <div className={s.header__main}>
                    <div className={s.icons}>
                        <SearchIcon />
                        <span className={s.switch}><LanguageSwitcher /></span>
                    </div>

                    <img src={image} alt='Логотип' onClick={() => navigate('/')} className={s.logo}/>

                    <div className={s.buttons}>
                        <Button view='strong'>{t('buttons.register')}</Button>
                        <Button view='strong'>{t('buttons.login')}</Button>
                    </div>

                    <MenuIcon onClick={open} className={s.menu}/>
                </div>

                <div className={cn(s.header__links, {
                    [s.hidden]: !isSecondLevelVisible
                })}>
                    {
                        links.map(link =>
                        <div key={link.to} className={s.borderEffect} onClick={() => navigate(link.to)}>
                            <Text color='primary' view="p-16">
                            {t(link.key)}
                        </Text></div>)
                    }
                </div>
            </div>

            <BurgerMenu onClose={close}
                        isOpen={isOpen}
                        links={links}
                        onLinkClick={(link) => navigate(link.to)} />
        </>
    );
}

export default Header;
