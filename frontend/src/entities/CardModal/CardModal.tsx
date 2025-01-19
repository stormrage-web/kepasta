import React, { useContext, useState } from "react";
import styles from "./CardModal.module.scss";
import Modal from "antd/lib/modal/Modal";
import { Button } from "antd";
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
  const [isLoading, setIsLoading] = useState(false);
  const [smallImages, setSmallImages] = useState<string[]>([src]); // Start with the original image
  const [mainImage, setMainImage] = useState<string>(src); // State for the main displayed image

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
        setIsLoading(false);
      });
  };

  return (
    <Modal
      className={styles.wrapper}
      width={720}
      open={open}
      onCancel={onCancel}
	  footer={footer}
    >
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
