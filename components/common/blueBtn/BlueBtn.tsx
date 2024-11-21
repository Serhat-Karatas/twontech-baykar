import Image from "next/image";
import React from "react";
import styles from "./blueBtn.module.css";

type blueBtnProps = {
  icon?: string;
  text: string;
  onMouseEnter?: any;
  onClick?: any;
  onMouseLeave?: any;
  isDisabled?: boolean;
  color?: string;
};

const BlueBtn = ({
  icon,
  text,
  onMouseEnter,
  onClick,
  onMouseLeave,
  isDisabled = false,
  color,
}: blueBtnProps) => {
  return (
    <button
      className={isDisabled ? styles.disabledCon : styles.container}
      style={{ backgroundColor: color ? color : "#1E40FF" }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={!isDisabled ? onClick : undefined}
    >
      {icon && (
        <Image
          alt="button icon"
          width={20}
          height={20}
          src={icon}
          className={styles.icon}
        />
      )}
      <div className={styles.text}>{text}</div>
    </button>
  );
};

export default BlueBtn;
