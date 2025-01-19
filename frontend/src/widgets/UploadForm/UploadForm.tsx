import React, { useContext } from "react";
import styles from "./UploadForm.module.scss";
import Form, { useForm } from "antd/lib/form/Form";
import Upload from "antd/lib/upload/Upload";
import { Button, UploadProps } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { Collapse, message } from "antd/lib";
import { CardsContext } from "../../pages/MainPage/MainPage";

export interface UploadFormProps {
  setTab: (x: string) => void;
}

const UploadForm = ({ setTab }: UploadFormProps) => {
  const [form] = useForm();
  const [, setCards, , setResultCards] = useContext(CardsContext);

  const props: UploadProps = {
    name: "file",
    accept: ".json",
    action: "http://localhost:5000/source",
    headers: {
      "Content-Type": "application/json",
    },
    beforeUpload: (file) => {
      const reader = new FileReader();

      reader.onload = (e) => {
        if (setCards && setResultCards) {
          setCards(JSON.parse(e.target?.result as string));
          setResultCards(JSON.parse(e.target?.result as string));
          setTab("result");
        }
      };
      reader.readAsText(file);

      // Prevent upload
      return false;
    },
    onChange(info) {
      if (info.file.status === "done") {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  return (
    <div className={styles.wrapper}>
      <p className={styles.title}>Upload your JSON</p>
      <Form
        form={form}
        name="horizontal_login"
        layout="inline"
        className={styles.form}
      >
        <Upload {...props}>
          <Button icon={<UploadOutlined />} className={styles.uploadButton}>
            Click to Upload
          </Button>
        </Upload>

        <Collapse
          items={[
            {
              key: "1",
              label: "Sample JSON:",
              children: (
                <pre className={styles.jsonExample}>
                  {`[
  {
    "id": "10563370",
    "url": "http://avatars.mds.yandex.net/get-mpic/1911047/img_id4166009924152095531.jpeg/orig"
  },
  {
    "id": "10563371",
    "url": "https://ir.ozone.ru/s3/multimedia-6/wc1000/6731633766.jpg"
  }
]`}
                </pre>
              ),
            },
          ]}
        />
      </Form>
    </div>
  );
};

export default UploadForm;
