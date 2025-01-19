import React, { useState } from "react";
import Button from "antd/es/button";
import styles from "./Card.module.scss";
import CardModal from "../CardModal/CardModal";

export interface CardProps {
	id: string;
	url: string;
	name: string;
	modal?: boolean;
}

const Card = ({ url, name, modal, id }: CardProps) => {
	const [isModalOpen, setIsModalOpen] = useState(false);

	return (
		<div className={styles.wrapper}>
			<img src={url} alt="item" className={styles.picture} />
			<div className={styles.group}>
				<p>{name}</p>
				{modal && (
					<>
						<Button
							type="default" // Use default type for a non-primary button
							className={styles.customButton}
							onClick={() => setIsModalOpen(true)}
						>
							Change
						</Button>
						<CardModal
							src={url}
							id={id}
							open={isModalOpen}
							onCancel={() => setIsModalOpen(false)}
							footer={[]}
						/>
					</>
				)}
			</div>
		</div>
	);
};

export default Card;
