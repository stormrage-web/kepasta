import React, { useContext } from "react";
import UploadForm from "../../widgets/UploadForm/UploadForm";
import CardGroup from "../../widgets/CardGroup/CardGroup";
import { CardsContext } from "../../pages/MainPage/MainPage";
import styles from "./SourceTab.module.scss"; // Import updated styles

export interface SourceTabProps {
  setTab: (x: string) => void;
}

const SourceTab = ({ setTab }: SourceTabProps) => {
  const [cards] = useContext(CardsContext);

  return (
    <div className={styles.container}>
      <div className={styles.uploadFormWrapper}>
        <UploadForm setTab={setTab} />
      </div>
      <div className={styles.cardGroupWrapper}>
        <CardGroup items={cards} />
      </div>
    </div>
  );
};

export default SourceTab;
