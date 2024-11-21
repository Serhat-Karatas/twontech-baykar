import React from "react";
import styles from "./stepperList.module.css";

function StepperList({ data }) {
  return (
    <div className={styles.container}>
      <h2 className="text-xl">{data?.title}</h2>
      <div className={styles.stepper_circle_line}>
        <div className={styles.stepper_container}>
          {data?.stepper.map((item, index) => (
            <div key={index} className={styles.stepper_item}>
              <div className={styles.circle}>{index + 1}</div>
              <p className="w-[138px] xl:w-[245px] pb-4 md:pb-0 h-auto text-center text-gray-300 text-[10px] xl:text-lg">
                {item.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default StepperList;
