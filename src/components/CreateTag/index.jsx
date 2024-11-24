import React, { useState, useEffect } from "react";
import Draggable from "react-draggable";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import QRCode from "react-qr-code"; // QR code library

const CreateTag = () => {
  const [tagData, setTagData] = useState({
    shopId: "",
    code: "",
    price: "",
  });
  const [selectedElement, setSelectedElement] = useState(null); // Tracks selected text or QR code
  const [fontSizes, setFontSizes] = useState({
    shopId: 16,
    code: 16,
    price: 16,
  });
  const [previewData, setPreviewData] = useState(null);
  const [paperSize, setPaperSize] = useState({ width: 210, height: 297 }); // Default A4 size
  const [qrCodeData, setQrCodeData] = useState(null);
  const [qrSize, setQrSize] = useState(100); // Initial QR code size

  const paperSizes = [
    { label: "A4 (210 × 297 mm)", value: { width: 210, height: 297 } },
    { label: "Letter (8.5 × 11 in)", value: { width: 215.9, height: 279.4 } },
    { label: "Legal (8.5 × 14 in)", value: { width: 215.9, height: 355.6 } },
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTagData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePaperSizeChange = (e) => {
    const selectedSize = paperSizes.find((size) => size.label === e.target.value);
    setPaperSize(selectedSize.value);
  };

  useEffect(() => {
    setPreviewData({ ...tagData });
  }, [tagData]);

  const handleGenerateQRCode = () => {
    setQrCodeData({
      tagData,
      paperSize,
    });
  };

  const handlePrint = () => {
    const printContent = document.getElementById("printable-preview");
    const newWindow = window.open();
    newWindow.document.write(`
      <html>
        <head>
          <style>
            @media print {
              body { margin: 0; }
              #printable-preview {
                width: ${paperSize.width}mm;
                height: ${paperSize.height}mm;
                margin: auto;
              }
            }
          </style>
        </head>
        <body>${printContent.innerHTML}</body>
      </html>
    `);
    newWindow.document.close();
    newWindow.print();
  };

  const handleFontSizeChange = (field, delta) => {
    setFontSizes((prev) => ({
      ...prev,
      [field]: Math.max(10, prev[field] + delta),
    }));
  };

  const deselectElement = () => {
    setSelectedElement(null);
  };

  return (
    <div className="mx-56 my-20 grid grid-cols-2 gap-10" onClick={deselectElement}>
      {/* Left Section */}
      <div onClick={(e) => e.stopPropagation()}>
        <h1 className="text-2xl font-bold">Enter Details</h1>
        <div className="my-4 flex flex-col gap-3">
          <div>
            <h3>Shop Id</h3>
            <Input
              type="text"
              placeholder="Enter Shop Id"
              name="shopId"
              value={tagData.shopId}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <h3>Code</h3>
            <Input
              type="text"
              placeholder="Enter Code"
              name="code"
              value={tagData.code}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <h3>Price</h3>
            <Input
              type="text"
              placeholder="Enter Price"
              name="price"
              value={tagData.price}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <h3>Page Size</h3>
            <select
              className="border px-2 py-1"
              onChange={handlePaperSizeChange}
            >
              {paperSizes.map((size, index) => (
                <option key={index} value={size.label}>
                  {size.label}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="flex justify-end">
          <Button onClick={handleGenerateQRCode}>Generate QR Code</Button>
        </div>
      </div>

      {/* Right Section */}
      <div>
        <h1 className="text-2xl font-bold">Your Tag</h1>
        <div
          id="printable-preview"
          className="border border-gray-300 rounded-md mt-4 relative overflow-hidden bg-gray-100"
          style={{
            width: `${paperSize.width}mm`,
            height: `${paperSize.height}mm`,
            position: "relative",
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {previewData &&
            Object.entries(previewData).map(([key, value]) => (
              <Draggable key={key}>
                <div
                  style={{
                    fontSize: `${fontSizes[key]}px`,
                    position: "absolute",
                    cursor: "move",
                    border:
                      selectedElement === key ? "1px dashed black" : "none",
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedElement(key);
                  }}
                >
                  {value}
                  {selectedElement === key && (
                    <div
                      style={{
                        position: "absolute",
                        top: "100%",
                        left: "50%",
                        transform: "translateX(-50%)",
                        background: "white",
                        padding: "5px",
                        display: "flex",
                        gap: "5px",
                      }}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Button onClick={() => handleFontSizeChange(key, 2)}>
                        +
                      </Button>
                      <Button onClick={() => handleFontSizeChange(key, -2)}>
                        -
                      </Button>
                    </div>
                  )}
                </div>
              </Draggable>
            ))}
          {qrCodeData && (
            <Draggable>
              <div
                style={{
                  width: `${qrSize}px`,
                  height: `${qrSize}px`,
                  cursor: "move",
                  border:
                    selectedElement === "qr" ? "1px dashed black" : "none",
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedElement("qr");
                }}
              >
                <QRCode value={JSON.stringify(qrCodeData)} size={qrSize} />
                {selectedElement === "qr" && (
                  <div
                    style={{
                      position: "absolute",
                      top: "100%",
                      left: "50%",
                      transform: "translateX(-50%)",
                      background: "white",
                      padding: "5px",
                      display: "flex",
                      gap: "5px",
                    }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Button onClick={() => setQrSize(qrSize + 10)}>+</Button>
                    <Button onClick={() => setQrSize(Math.max(50, qrSize - 10))}>
                      -
                    </Button>
                  </div>
                )}
              </div>
            </Draggable>
          )}
        </div>
        <div className="mt-4 flex justify-end">
          <Button onClick={handlePrint}>Print</Button>
        </div>
      </div>
    </div>
  );
};

export default CreateTag;
