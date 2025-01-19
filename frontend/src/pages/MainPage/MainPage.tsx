import React, { createContext, Dispatch, SetStateAction, useState } from "react";
import { useLocation } from "react-router-dom";
import styles from "./MainPage.module.scss";
import SourceTab from "../../tabs/SourceTab/SourceTab";
import ResultTab from "../../tabs/ResultTab/ResultTab";
import Item from "../../models/Item";
import doorIcon from "../../assets/images/exit1.png"; 

export const CardsContext = createContext<[Item[], Dispatch<SetStateAction<Item[]>> | undefined, Item[], Dispatch<SetStateAction<Item[]>> | undefined]>([[], undefined, [], undefined]);

const MainPage = () => {
  const [current, setCurrent] = useState("src");
  const [cards, setCards] = useState<Item[]>([]);
  const [resultCards, setResultCards] = useState<Item[]>([]);
  const location = useLocation();
  const userName = location.state?.userName;

  return (
    <CardsContext.Provider value={[cards, setCards, resultCards, setResultCards]}>
      <div className={styles.wrapper}>
        <div className={styles.header}>
          <h1 className={styles.title}>Kepasta</h1>
          <div className={styles.userInfo}>
            <span>{userName}</span>
            <img src={doorIcon} alt="Log out" className={styles.icon} />
          </div>
        </div>

        {/* Render SourceTab or ResultTab based on current state */}
        {current === "src" ? <SourceTab setTab={setCurrent} /> : <ResultTab />}
      </div>
    </CardsContext.Provider>
  );
};

export default MainPage;
