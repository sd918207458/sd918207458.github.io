import React from 'react';
import QRCode from 'react-qr-code';

const QRCodeGenerator = () => {
  const options = [
    { value: "story:5", label: "第一章故事-1", url: "/?dialogIndex=5" },
  ];
  const baseUrl = "https://sanmingmemoryjourney.com"; 

  return (
    <div style={{ textAlign: 'center' }}>
      {options.map((option, index) => (
        <div key={index} style={{ marginBottom: '20px' }}>
          <h3>{option.label}</h3>
          <QRCode value={`${baseUrl}${option.url}`} size={150} />
        </div>
      ))}
    </div>
  );
};

export default QRCodeGenerator;
