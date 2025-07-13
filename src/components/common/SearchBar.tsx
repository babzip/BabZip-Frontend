import type { ChangeEvent } from 'react';
import styles from './searchBar.module.css';

type Props = {
  placeholder: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

const SearchBar = ({ value, placeholder, onChange }: Props) => {
  return (
    <div className={styles.container}>
      <input
        type='text'
        value={value}
        className={styles.input}
        placeholder={placeholder}
        onChange={onChange}
      />
    </div>
  );
};

export default SearchBar;
