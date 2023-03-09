import './style.css';
import SignInFrm from './SignIn';
import SignUpFrm from './SignUp';
import ForgotPasswordFrm from './ForgotPassword';
import MainBackground from '../../components/MainBackground';
import heroSvg from '../../assets/svg/hero-black.svg';
function SignIn() {
    return (
        <>
            <MainBackground></MainBackground>
            <main>
                <img src={heroSvg} alt='' />
                {/* <SignInFrm></SignInFrm> */}
                <SignUpFrm></SignUpFrm>
                {/* <ForgotPasswordFrm></ForgotPasswordFrm> */}
            </main>
        </>
    );
}

export default SignIn;
