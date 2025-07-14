import styles from './loginpage.module.css';

function LoginPage() {
  return (
    <div className={styles.container}>
      <img src='/logo.svg' alt='logo' />
      <div className={styles.subtitle}>로그인하고 맛집을 기록해보세요!</div>
      <div className={styles.btnWrapper}>
        <img src='/kakao_login_btn.svg' alt='카카오 로그인 버튼' />
        <img src='/google_login_btn.svg' alt='구글 로그인 버튼' />
      </div>
    </div>
  );
}

export default LoginPage;
