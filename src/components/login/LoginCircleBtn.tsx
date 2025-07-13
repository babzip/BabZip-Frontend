import styles from './loginCircleBtn.module.css';

type Props = {
  onClick: () => void;
};

const LoginCircleBtn = ({ onClick }: Props) => {
  return (
    <div className={styles.container} onClick={onClick}>
      로그인
    </div>
  );
};

export default LoginCircleBtn;
