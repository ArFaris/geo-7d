import s from './BurgerMenu.module.scss';
import cn from 'classnames';
import type { Link } from '../../Header';
import Text from 'components/Text';
import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import CloseIcon from 'components/icons/CloseIcon';
import Button from 'components/Button';
import LanguageSwitcher from 'components/LanguageSwitcher';
import { useLanguage } from 'contexts/LanguageContext';
import { useNavigate } from 'react-router-dom';
import UserIcon from 'components/icons/UserIcon';
import { useAuth } from 'contexts/AuthContext';

type BurgerMenuProps = {
    isOpen: boolean,
    onClose: () => void;
    links: Link[],
    onLinkClick: (link: Link) => void,
    className?: string
}

const BurgerMenu: React.FC<BurgerMenuProps> = ({
    isOpen,
    onClose,
    links, 
    onLinkClick,
    className}: 
BurgerMenuProps) => {
    const { t } = useLanguage();
    const navigate = useNavigate();
    const { user, loading } = useAuth();

    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        }

        let resizeTimer: number;
        const handleResize = () => {
            if (resizeTimer) {
                clearTimeout(resizeTimer);
            }

            resizeTimer = setTimeout(() => {
                if (window.innerWidth > 1024) {
                    onClose();
                }
            }, 150);
        }

        if (isOpen) {
            document.body.style.overflow = 'hidden';
            document.addEventListener('keydown', handleEscape);
            window.addEventListener('resize', handleResize);
        }

        return () => {
            document.body.style.overflow = 'auto';
            document.removeEventListener('keydown', handleEscape);
            window.removeEventListener('resize', handleResize);

            if (resizeTimer) {
                clearTimeout(resizeTimer);
            }
        }
    }, [isOpen, onClose]);

    return createPortal(
        <div className={cn(s.menu, className, isOpen ? s.open : s.close)}>
            <CloseIcon className={s.icon} color="accent" onClick={onClose}/>
            <LanguageSwitcher />
            <nav className={s.links}>
                {
                    links.map(link =>
                    <div key={link.to} onClick={() => { onClose(); onLinkClick(link)}} className={cn(s.link, s.borderEffect)}>
                        <Text view="p-16" color='gray'>{t(link.key)}</Text>
                    </div>)
                }
            </nav>

            <div className={cn(s.buttons, s.menu__buttons)}>
                {!user && <Button view='dark' className={s.btn} onClick={() => { onClose(); navigate('/registration')}}>{t('buttons.register')}</Button>}
                {!user && <Button view='dark' className={s.btn} onClick={() => { onClose(); navigate('/login')}}>{t('buttons.login')}</Button>}
                {user && <Button view='dark' className={cn(s.btn, s.btn__user)} onClick={() => { onClose(); navigate('/profile')}}>{t('buttons.profile')}</Button>}
            </div>
        </div>,
        document.body
    );
}

export default BurgerMenu;
