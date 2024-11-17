import React, { useContext, useState } from "react";
import styles from "./CardModal.module.scss";
import Modal from "antd/lib/modal/Modal";
import { Button } from "antd";
import Form, { useForm } from "antd/lib/form/Form";
import Input from "antd/lib/input/Input";
import { ModalProps, Spin } from "antd/lib";
import axios from "axios";
import { CardsContext } from "../../pages/MainPage/MainPage";

interface CardModadProps extends ModalProps {
	id: string;
	src: string;
}

const CardModal = ({src, id, ...props}: CardModadProps) => {
	const [,,resultCards, setResultCards] = useContext(CardsContext);
	const [prompt, setPrompt] = useState("");
	const [form] = useForm();
	const [isLoading, setIsLoading] = useState(false);

	const handleChange = (type: string) => {
		setIsLoading(true);
		axios.post("http://51.250.91.130:5000/action", { id, type, url: resultCards.find(item => item.id === id)?.url }).then(result => {
			if (setResultCards) {
				const prev = [...resultCards];
				const prevInd = prev.findIndex(item => item.id == id);
				console.log(prevInd);
				if (prevInd !== -1) {
					const item = {...prev[prevInd], url: result.data[0].url};
					prev[prevInd] = item;
					console.log(prev);
					setResultCards(prev);
				}
			}
			setIsLoading(false);
		});
	};

	const handlePrompt = (prompt: string) => {
		setIsLoading(true);
		axios.post("http://81.94.159.242:5000/prompt", { id, prompt, url: resultCards.find(item => item.id === id)?.url }).then(result => {
			console.log(result);
			if (setResultCards) {
				const prev = [...resultCards];
				const prevInd = prev.findIndex(item => item.id === id);
				if (prevInd !== -1) {
					const item = {...prev[prevInd], url: result.data[0].url};
					prev[prevInd] = item;
					console.log(prev);
					setResultCards(prev);
				}
			}
			setIsLoading(false);
		});
	};

	return (
		<Modal className={styles.wrapper} width={720} {...props}>
			<Form
				form={form}
				name="horizontal_login"
				layout="inline"
				className={styles.form}
			>

				<Input placeholder="Type your prompt" value={prompt} onChange={(e) => setPrompt(e.target.value)} className={styles.input} />
				<Button type="primary" htmlType="submit" onClick={() => handlePrompt(prompt)} className={styles.submit}>
					Submit
				</Button>
			</Form>
			<div className={styles.group}>
				{isLoading ? <Spin/> : (
					<img src={src} className={styles.group__image} alt="item" />
				)}
				<div className={styles.group__left}>
					<Button type="primary" onClick={() => handleChange("white")} className={styles.changeButton}>
						White background
					</Button>
					<Button type="primary" onClick={() => handleChange("info")} className={styles.changeButton}>
						Delete infographics
					</Button>
				</div>
			</div>
		</Modal>
	);
};

export default CardModal;