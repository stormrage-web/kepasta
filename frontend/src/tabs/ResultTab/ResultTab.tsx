import React, { useContext } from "react";

import CardGroup from "../../widgets/CardGroup/CardGroup";
import { CardsContext } from "../../pages/MainPage/MainPage";

const ResultTab = () => {
	const [, , resultCards] = useContext(CardsContext);

	return <CardGroup items={resultCards} modal />;
};

export default ResultTab;
