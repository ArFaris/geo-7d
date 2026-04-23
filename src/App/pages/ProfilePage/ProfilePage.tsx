import { signOutUser } from 'api/api';
import Button from 'components/Button';
import Text from 'components/Text';
import EarthIcon from 'components/icons/EarthHoriz';
import { useAuth } from 'contexts/AuthContext';
import { useLanguage } from 'contexts/LanguageContext';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import s from './ProfilePage.module.scss';
import Title from 'components/Title';

const ProfilePage = () => {
    const { user } = useAuth();
    const { t } = useLanguage();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    console.log(user)

    const handleSignOutUser = async () => {
        if (loading) return;

        try {
            setLoading(true);
            await signOutUser();
            navigate('/login');
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <>
            <div className={s.earth__wrapper}><EarthIcon className={s.earth}/></div>

            <section className={s.page}>
                <Title title={'profile'} />

                <div className={s.fields}>
                    <div>
                        <Text view='subtitle' weight='medium'>{t('profile.name')}</Text>
                        <Text className={s.field}>{user?.user_metadata?.name ?? '—'}</Text>
                    </div>

                    <div>
                        <Text view='subtitle' weight='medium'>{t('profile.email')}</Text>
                        <Text className={s.field}>{user?.email ?? '-'}</Text>
                    </div>

                    <Button className={s.btn} loading={loading} view='strong' onClick={handleSignOutUser}>{t('profile.out')}</Button>
                </div>
            </section>
        </>
    );
}

export default ProfilePage;
