import { Props } from "./type";
import styles from "./styles.module.css";

const SelectBox = ({ label, options, placeholder, disabled }: Props) => {
  return (
    <div className={styles.wrapper}>
      <label className={styles.label}>{label}</label>
      <select className={styles.select} disabled={disabled}>
        <option value="">{placeholder}</option>
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectBox;
