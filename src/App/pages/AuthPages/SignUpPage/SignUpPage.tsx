import { useLanguage } from "contexts/LanguageContext";
import AuthWrapper, { type InputAttributes } from "../components/AuthWrapper";

const SignUpPage = () => {
    const { t } = useLanguage();
    
    const inputsAttributes: InputAttributes[] = [
        {
            text: t('form.name'),
            type: "text",
            name: 'firstName'
        }, {
            text: t('form.email'), 
            type: "email",
            name: 'email'
        }, {
            text: t('form.password'), 
            type: "password",
            autoComplete: "new-password",
            name: 'password'
        }, {
            text: t('form.repeat'),
            type: "password",
            name: 'copyPassword'
        }];

    return (
        <AuthWrapper 
            type="register" 
            inputsAttributes={inputsAttributes}>
        </AuthWrapper>
    );
}

export default SignUpPage;
