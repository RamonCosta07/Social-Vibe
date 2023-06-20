// Styles
import * as S from "./PostFormStyles";
// Hooks
import React, { useState, useRef, useEffect } from "react";
// Interfaces
import { IPostFormProps } from "../../interfaces/IComponents/IPostForm";
// Icons
import { BsUpload } from "react-icons/bs";
// Rows maximas do post
const MAX_ROWS = 7;
// O tamanho máximo do nome do arquivo exibido
const MAX_FILENAME_LENGTH = 20;

const PostForm: React.FC<IPostFormProps> = ({ onPost }) => {
  const [content, setContent] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [selectedImage, setSelectedImage] = useState("");
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const fileInputRef = useRef<HTMLInputElement>(null);
  let debounceTimeout: NodeJS.Timeout;

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    setImage(file);
    setSelectedImage(file ? truncateFileName(file.name) : "");
  };

  const truncateFileName = (fileName: string): string => {
    if (fileName.length <= MAX_FILENAME_LENGTH) {
      return fileName;
    } else {
      return fileName.slice(0, MAX_FILENAME_LENGTH) + "...";
    }
  };

  const handleContentChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { value } = event.target;
    const rows = value.split("\n");

    if (rows.length <= MAX_ROWS) {
      setContent(value);
    }
  };

  const updatebuttonDisabled = () => {
    if (content.trim() || image) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  };

  const debouncedUpdatebuttonDisabled = () => {
    clearTimeout(debounceTimeout);
    debounceTimeout = setTimeout(updatebuttonDisabled, 300);
  };
  
  useEffect(() => {
    debouncedUpdatebuttonDisabled();
    return () => {
      clearTimeout(debounceTimeout);
    };
  }, [content, image]);

  const handlePost = () => {
    const trimmedContent = content.trim();

    if (trimmedContent !== "" || image) {
      if (image) {
        onPost(trimmedContent, image);
      } else {
        onPost(trimmedContent);
      }
      setContent("");
      setSelectedImage("");
      setImage(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  return (
    <S.FormContainer>
      <S.TextAreaContainer>
        <S.FormTextArea
          value={content}
          onChange={handleContentChange}
          maxLength={200}
          placeholder="Digite aqui..."
        />
        {content.length > 0 && (
          <S.CharacterCount>{content.length}/200</S.CharacterCount>
        )}
      </S.TextAreaContainer>
      <>
        <S.UploadInputContainer>
          <S.UploadInputLabel htmlFor="image-upload">
            <BsUpload />
            {selectedImage ? selectedImage : "Escolha uma foto"}
          </S.UploadInputLabel>
          <S.UploadInput
            id="image-upload"
            type="file"
            ref={fileInputRef}
            onChange={handleImageChange}
          />
        </S.UploadInputContainer>
        <S.PostButton onClick={handlePost} disabled={buttonDisabled}>
          Postar
        </S.PostButton>
      </>
    </S.FormContainer>
  );
};

export default PostForm;
