import { useLanguage } from "contexts/LanguageContext";
import AuthWrapper, { type InputAttributes } from "../components/AuthWrapper";

const SignInPage = () => {
    const { t } = useLanguage();
    
    const inputsAttributes: InputAttributes[] = [
        {
            text: t('form.email'),
            type: "email",
            name: 'email'
        }, {
            text: t('form.password'),
            type: "password",
            autoComplete: "new-password",
            name: 'password'
        }]

    return (
        <AuthWrapper 
            type="login" 
            inputsAttributes={inputsAttributes}>
        </AuthWrapper>
    );
}

export default SignInPage;
