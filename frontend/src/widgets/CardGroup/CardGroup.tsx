import React from "react";
import styles from "./CardGroup.module.scss";
import Card from "../../entities/Card/Card";
import Item from "../../models/Item";

export interface CardGroupProps {
  items: Item[];
  modal?: boolean;
  placeholderCount?: number; // Number of empty squares to display
}

const CardGroup = ({ items, modal, placeholderCount = 5 }: CardGroupProps) => {
  const placeholders = Array.from({ length: placeholderCount });

  return (
    <div className={styles.container}>
      {/* Title Section */}
      <div className={styles.titleContainer}>
        <hr className={styles.line} />
        <h2 className={styles.title}>Collection #1</h2>
        <hr className={styles.line} />
      </div>

      {/* Grid Section */}
      <div className={styles.wrapper}>
        {items.length > 0 ? (
          items.map((item) => (
            <Card key={item.id} id={item.id} url={item.url} name={item.name} modal={modal} />
          ))
        ) : (
          placeholders.map((_, index) => (
            <div key={`placeholder-${index}`} className={styles.placeholder}></div>
          ))
        )}
      </div>
    </div>
  );
};

export default CardGroup;
