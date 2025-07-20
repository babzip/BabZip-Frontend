import styles from './profile.module.css';

type Props = {
  imgUrl: string;
  onClick: () => void;
};

const Profile = ({ imgUrl, onClick }: Props) => {
  return (
    <div className={styles.container} onClick={onClick}>
      <img src={imgUrl} alt='프로필' className={styles.image} />
    </div>
  );
};

export default Profile;
