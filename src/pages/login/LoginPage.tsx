import styles from './loginpage.module.css';

function LoginPage() {
  const apiUrl = import.meta.env.API_URL;
  const handleKakaoLogin = () => {
    const redirectUri = `${window.location.origin}/auth/success`;
    const encoded = encodeURIComponent(redirectUri);
    const kakaoLoginUrl = `${apiUrl}/oauth2/authorization/kakao?redirect_uri=${encoded}`;
    window.location.href = kakaoLoginUrl;
  };

  const handleGoogleLogin = () => {
    const redirectUri = `${window.location.origin}/auth/success`;
    const encoded = encodeURIComponent(redirectUri);
    const googleLoginUrl = `${apiUrl}/oauth2/authorization/google?redirect_uri=${encoded}`;
    window.location.href = googleLoginUrl;
  };

  return (
    <div className={styles.container}>
      <div className={styles.loginPhoto}>
        <img src='/logo.svg' alt='logo' />
        <div className={styles.subtitle}>로그인하고 맛집을 기록해보세요!</div>
      </div>

      <div className={styles.btnWrapper}>
        <img
          src='/kakao_login_btn.svg'
          alt='카카오 로그인 버튼'
          onClick={handleKakaoLogin}
        />
        <img
          src='/google_login_btn.svg'
          alt='구글 로그인 버튼'
          onClick={handleGoogleLogin}
        />
      </div>
    </div>
  );
}

export default LoginPage;
