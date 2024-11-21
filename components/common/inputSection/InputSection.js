"use client";

import React, { useState } from "react";
import styles from "./inputSection.module.css";
import Image from "next/image";
import eyeOpenedIcon from "@/public/eye.svg";
import eyeClosedIcon from "@/public/eye-slash.svg";

const InputSection = ({
  value,
  placeholder,
  inputType,
  maxLength,
  button,
  isDisable,
  onChange,
}) => {
  const inputContainerClass = button
    ? styles.inputContainer
    : isDisable
    ? `${styles.inputContainer} ${styles.shadowStyle} bg-[#efefef]`
    : `${styles.inputContainer} ${styles.shadowStyle}`;
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    if (inputType === "password") {
      setShowPassword(!showPassword);
    }
  };

  return (
    <div className={styles.container}>
      <div className={inputContainerClass}>
        <input
          type={showPassword ? "text" : inputType}
          placeholder={placeholder}
          className={styles.input}
          disabled={isDisable}
          value={value}
          onChange={onChange}
          maxLength={maxLength}
          style={{
            background: "transparent",
          }}
        />
        {inputType === "password" && (
          <div
            className={styles.iconContainer}
            onClick={togglePasswordVisibility}
          >
            <Image
              src={showPassword ? eyeOpenedIcon : eyeClosedIcon}
              alt="icon"
              width={20}
              height={20}
              fetchPriority="high"
              loading="eager"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default InputSection;
