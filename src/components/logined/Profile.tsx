import styles from "./profile.module.css";

type Props = {
  onClick: () => void;
};

const Profile = ({ onClick }: Props) => {
  return (
    <div className={styles.container} onClick={onClick}>
      <img src="/Ellipse.png" alt="프로필" className={styles.image} />
    </div>
  );
};

export default Profile;
