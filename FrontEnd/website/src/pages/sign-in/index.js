import SignInFrm from './SignIn';
import SignUpFrm from './SignUp';
import ForgotPasswordFrm from './ForgotPassword';
import MainBackground from '../components/MainBackground';
import {useState} from 'react';
import css from './style.module.css';
import Hero from '../../components/Hero';
function SignIn({initFormType = 'login'}) {
    const [formType, setFormType] = useState(initFormType);

    const toggleForm = (formType) => {
        setFormType(formType);
    };

    return (
        <>
            <MainBackground></MainBackground>
            <main className={css.main}>
                <Hero className={css.hero}></Hero>
                {formType === 'login' && <SignInFrm />}
                {formType === 'register' && <SignUpFrm setFormType={setFormType} />}
                {formType === 'forgotPassword' && <ForgotPasswordFrm />}
                <button
                    onClick={() => toggleForm((formType === 'login' && 'register') || 'login')}
                    className={css.swapper + ' mt--24'}>
                    {formType === 'login' && 'Chưa có tài khoản? Đăng ký ngay!'}
                    {formType === 'register' && 'Đã có tài khoản? Đăng nhập ngay!'}
                    {formType === 'forgotPassword' && 'Đã nhớ tài khoản? Đăng nhập ngay!'}
                </button>
                {/* nếu là forgot form thì ẩn button forgot đi */}
                {formType != 'forgotPassword' && (
                    <button onClick={() => toggleForm('forgotPassword')} className={css.swapper}>
                        Quên mật khẩu?
                    </button>
                )}
            </main>
        </>
    );
}

export default SignIn;
