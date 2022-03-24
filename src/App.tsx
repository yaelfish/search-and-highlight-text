import React, { useState, useEffect } from 'react';
import { FileUpload } from './components/file-upload/file-upload';
import { HighlightedText } from './components/highlighter/highlighter';
import './app.scss';

function App() {

  const [text, setText] = useState<string>('');
  const [searchIsOpen, setSearchIsOpen] = useState(false);

  const handleKeyboardPress = (event: React.KeyboardEvent) => {
    if (event.metaKey && event.key.toLowerCase() === 'f') { // "Command + F"
      event.preventDefault();
      setSearchIsOpen(prev => !prev)
    }
  }
  
  useEffect(() => {
    window.addEventListener('keydown', handleKeyboardPress as any)
  
    return () => window.removeEventListener('keydown', handleKeyboardPress as any)
  }, []);

  const displayFile = (file: any) => {
    setText(file)
  }  

  return (
    <div className="app">
      <h1>Search my text file</h1>
      <FileUpload displayFile={displayFile}/>
      <HighlightedText
        text={text}
        searchIsOpen={searchIsOpen}
        setSearchIsOpen={setSearchIsOpen}
      /> 
    </div>
  );
}

export default App;