import React, { useContext } from "react";

import UploadForm from "../../widgets/UploadForm/UploadForm";
import CardGroup from "../../widgets/CardGroup/CardGroup";
import { CardsContext } from "../../pages/MainPage/MainPage";

export interface SourceTabProps {
	setTab: (x: string) => void;
}

const SourceTab = ({setTab}: SourceTabProps) => {
	const [cards] = useContext(CardsContext);

	return (
		<>
			<UploadForm setTab={setTab} />
			<CardGroup items={cards}/>
		</>
	);
};

export default SourceTab;
