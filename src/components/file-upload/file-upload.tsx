import React, { useState } from 'react';
import './file-upload.scss';

interface FileUploadProps {
  displayFile: (file: any) => void;
}

export const FileUpload: React.FC<FileUploadProps> = ({displayFile}) => {
  const [message, setMessage] = useState('');

  const showFile = (e: React.ChangeEvent<any>) => {
    try {
      e.preventDefault();
      const reader = new FileReader();
      reader.onload = (e) => {
        const text = e.target?.result;
        if (text) displayFile(text.toString());
      };
      reader.readAsText(e.target.files[0]);
    }
    catch(err){
      setMessage('Something went wrong, please try again')
    }
  };

  return (
    <>
      {message && <div>{message}</div>}
      <label htmlFor="input-file">
        <input 
          accept=".txt" 
          id="input-file" 
          multiple 
          type="file" 
          onChange={showFile} 
          name="text-file"
        />
      </label>
    </>
  );
};
