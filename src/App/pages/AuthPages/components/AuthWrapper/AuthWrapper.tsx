import s from './AuthWrapper.module.scss';
import Text from 'components/Text';
import Input from 'components/Input';
import { ZodError } from 'zod';
import { useState } from 'react';
import { UserShema } from 'shared/schemas/user.schema';
import { validation } from 'shared/utils/validation-error';
import Button from 'components/Button';
import { useLanguage } from 'contexts/LanguageContext';
import EarthLeftIcon from 'components/icons/EarthLeft';
import { loginUser, registerUser } from 'api/api';

export type InputAttributes = {
    text: string,
    type: string,
    autoComplete?: string,
    name: string
}

type AuthWrapperProps = {
    type: 'register' | 'login',
    inputsAttributes: InputAttributes[]
}

const AuthWrapper: React.FC<AuthWrapperProps> = ({
    type, 
    inputsAttributes
}: AuthWrapperProps) => {
    const { t } = useLanguage();
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [loading, setLoading] = useState(false);

    const handleInputSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
        if (loading) return;

        e.preventDefault();
        setErrors({});

        const formData = new FormData(e.currentTarget);

        const user= {
            name: formData.get('firstName')?.toString() ?? (type === 'login' ? 'nullName' : ''),
            email: formData.get('email')?.toString() || '',
            password: formData.get('password')?.toString() || '',
        }

        try {
            UserShema.partial().parse(user);
        } catch(error) {
            if (error instanceof ZodError) {
                const fieldErrors = validation(error);
                setErrors(fieldErrors);
                return;
            }
        }

        if (type === 'register') {
            if (user.password !== formData.get('copyPassword')) {
                setErrors({'password': 'Passwords must match', 'copyPassword': 'Passwords must match'});
                return;
            };       
            
            try {
                setLoading(true);
                await registerUser(user.name, user.email, user.password);
                alert('Письмо для подтверждения отправлено на ваш email. Перейдите по ссылке в письме.');
            } catch(error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        } else {
            try {
                setLoading(true);
                await loginUser(user.email, user.password);
            } catch(error) {
                console.error(error);
                setErrors({'userNotFound': 'Account not found'});
            } finally {
                setLoading(false);
            }
        }
    }

    return (
        <form onSubmit={(e) => handleInputSubmit(e)} className={s.page}>
            <EarthLeftIcon className={s.earh}/>
            
            <header className={s.header}>
                <span className={s.line}></span>
                <Text className={s.title} weight='medium' view='title-small' color='secondary'>{t(`buttons.${type}`)}</Text>
                <span className={s.line}></span>
            </header>

            <div className={s.form}>
                <div className={s.fields}>
                    {inputsAttributes.map(attributes => (
                        <div key={attributes.name} className={s.inputBox}>
                            <Input  name={attributes.name} 
                                    autoComplete={attributes.autoComplete} 
                                    placeholder={attributes.text} 
                                    type={attributes.type} 
                                    required
                                    error={!!errors[attributes.name]}
                            />
                            {errors[attributes.name] && <Text className={s['text-error']} view="p-14">{errors[attributes.name]}</Text>}
                        </div>
                    ))}
                    {errors['userNotFound'] && <Text className={s['text-error']} view="p-14">{errors['userNotFound']}</Text>}
                </div>

                <Button loading={loading} type='submit' view='light' className={s.submit}>{t(`form.${type}`)}</Button>
            </div>
        </form>
    )
}

export default AuthWrapper;
