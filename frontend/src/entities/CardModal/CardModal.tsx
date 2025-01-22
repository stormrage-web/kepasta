import React, { useContext, useState } from "react";
import styles from "./CardModal.module.scss";
import Modal from "antd/lib/modal/Modal";
import { Button } from "antd";
import Form, { useForm } from "antd/lib/form/Form";
import Input from "antd/lib/input/Input";
import { Spin } from "antd/lib";
import axios from "axios";
import { CardsContext } from "../../pages/MainPage/MainPage";

interface CardModalProps {
  id: string;
  src: string;
  open: boolean;
  onCancel: () => void;
  footer?: React.ReactNode[]; 
}

const CardModal = ({ src, id, open, onCancel, footer }: CardModalProps) => {
  const [,, resultCards, setResultCards] = useContext(CardsContext);
  const [prompt, setPrompt] = useState("");
  const [form] = useForm();
  const [isLoading, setIsLoading] = useState(false);
  const [smallImages, setSmallImages] = useState<string[]>([src]); // Start with the original image
  const [mainImage, setMainImage] = useState<string>(src); // State for the main displayed image
  const [isNewImage, setIsNewImage] = useState(false);

  const handleChange = (type: string) => {
    setIsLoading(true);
    axios.post("http://localhost:5000/action", { id, type, url: resultCards.find(item => item.id === id)?.url })
      .then(result => {
        if (setResultCards) {
          const prev = [...resultCards];
          const prevInd = prev.findIndex(item => item.id === id);
          if (prevInd !== -1) {
            const item = { ...prev[prevInd], url: result.data[0].url };
            prev[prevInd] = item;
            setResultCards(prev);
          }
        }
        // Update main image and add new image to small images
        const newImageUrl = result.data[0].url;
        setMainImage(newImageUrl); // Set the new image as the main displayed image
        setSmallImages(prev => [...prev, newImageUrl]); // Add new image to small images without reordering
        setIsNewImage(true);
        setIsLoading(false);
      });
  };

  const handlePrompt = (prompt: string) => {
		setIsLoading(true);
		axios.post("http://localhost:5000/prompt", { id, prompt, url: resultCards.find(item => item.id === id)?.url })
     .then(result => {
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
			const newImageUrl = result.data[0].url;
      setMainImage(newImageUrl); // Set the new image as the main displayed image
      setSmallImages(prev => [...prev, newImageUrl]); // Add new image to small images without reordering
      setIsNewImage(true);
      setIsLoading(false);
		});
	};

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = mainImage; // Use the current main image URL for download
    link.setAttribute('download', 'main_image.jpg'); // Set a default filename for download
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Modal
      className={styles.wrapper}
      width={720}
      open={open}
      onCancel={onCancel}
	  footer={footer}
    >
      <Form
        form={form}
        name="horizontal_login"
        layout="inline"
        className={styles.form}
      >
        <Input 
          placeholder="Type your prompt" 
          value={prompt} 
          onChange={(e) => setPrompt(e.target.value)} 
          className={styles.input} 
        />
      </Form>
      <div className={styles.group}>
        {isLoading ? <Spin /> : (
          <img 
            src={mainImage} // Display the main image
            className={styles.group__image} 
            alt="item" 
            onClick={() => setMainImage(src)} // Clicking on the main image shows it in larger view
          />
        )}
        <div className={styles.group__left}>
          <Button type="default" onClick={() => handleChange("white")} className={styles.customButton}>
            White background
          </Button>
          <Button type="default" onClick={() => handleChange("info")} className={styles.customButton}>
            Delete infographics
          </Button>
          <Button type="default" onClick={() => handlePrompt(prompt)} className={styles.customButton}>
            Generate by prompt
          </Button>
          {/* Show download button only if the image is new */}
          {isNewImage && (
            <Button type="default" onClick={() => handleDownload()} className={styles.customButton}>
              Download Main Image
            </Button>
          )}
        </div>
      </div>

      {/* Render small images below */}
      <div className={styles.smallImagesContainer}>
        {smallImages.map((imageSrc, index) => (
          <img 
            key={index} 
            src={imageSrc} 
            alt={`small-item-${index}`} 
            className={styles.smallImage} 
            onClick={() => setMainImage(imageSrc)} // Set clicked small image as main
          />
        ))}
      </div>
    </Modal>
  );
};

export default CardModal;
