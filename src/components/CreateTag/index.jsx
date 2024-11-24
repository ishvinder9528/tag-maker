import React, { useState, useEffect } from "react";
import Draggable from "react-draggable";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import QRCode from "react-qr-code";

const CreateTag = () => {
  const [tagData, setTagData] = useState({
    shopId: "",
    code: "",
    price: "",
  });
  const [selectedElement, setSelectedElement] = useState(null);
  const [fontSizes, setFontSizes] = useState({
    shopId: 16,
    code: 16,
    price: 16,
  });
  const [previewData, setPreviewData] = useState(null);
  const [paperSize, setPaperSize] = useState({ width: 210, height: 297 }); // Default A4 size
  const [qrCodeData, setQrCodeData] = useState(null);
  const [qrSize, setQrSize] = useState(100);
  const [isMaximized, setIsMaximized] = useState(false);
  const [customSize, setCustomSize] = useState({ width: "", height: "", unit: "mm" });
  const [scale, setScale] = useState(1); // Scale factor for the preview box

  const paperSizes = [
    { label: "A4 (210 × 297 mm)", value: { width: 210, height: 297 } },
    { label: "Letter (8.5 × 11 in)", value: { width: 215.9, height: 279.4 } },
    { label: "Legal (8.5 × 14 in)", value: { width: 215.9, height: 355.6 } },
    { label: "Custom", value: "custom" },
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
    if (selectedSize.value === "custom") {
      setPaperSize(null); // Reset paper size
      setCustomSize({ width: "", height: "", unit: "mm" }); // Clear custom size inputs
    } else {
      setPaperSize(selectedSize.value);
    }
  };


  const handleCustomSizeChange = (e) => {
    const { name, value } = e.target;
    setCustomSize((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const applyCustomSize = () => {
    const width = parseFloat(customSize.width);
    const height = parseFloat(customSize.height);
    if (isNaN(width) || isNaN(height) || width <= 0 || height <= 0) {
      alert("Please enter valid width and height values.");
      return;
    }

    const conversionFactor =
      customSize.unit === "in" ? 25.4 : customSize.unit === "px" ? 0.264583 : 1; // Convert inches or pixels to mm
    setPaperSize({
      width: width * conversionFactor,
      height: height * conversionFactor,
    });
  };


  useEffect(() => {
    if (paperSize) {
      const previewBoxWidth = 400; // Fixed preview box width
      const scaleFactor = previewBoxWidth / paperSize.width;
      setScale(scaleFactor);
    } else {
      setScale(1); // Default scale when no paper size is selected
    }
    setPreviewData({ ...tagData });
  }, [tagData, paperSize]);

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

  const preventOverlap = (data, nodeRef) => {
    const rect = nodeRef.getBoundingClientRect();
    // Add logic here to adjust the position dynamically if it overlaps with other elements
    return data;
  };

  const deselectElement = () => {
    setSelectedElement(null);
  };

  const toggleMaximize = () => {
    setIsMaximized((prev) => !prev);
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
            {paperSize === null && (
              <div className="mt-3 flex items-center">

                <div  className="flex flex-col gap-3">
                  <Input
                    type="number"
                    placeholder="Width"
                    name="width"
                    value={customSize.width}
                    onChange={handleCustomSizeChange}
                    className="mr-2"
                  />
                  <Input
                    type="number"
                    placeholder="Height"
                    name="height"
                    value={customSize.height}
                    onChange={handleCustomSizeChange}
                    className="mr-2"
                  />
                  <select
                    className="border px-2 py-1"
                    name="unit"
                    value={customSize.unit}
                    onChange={handleCustomSizeChange}
                  >
                    <option value="mm">mm</option>
                    <option value="in">in</option>
                    <option value="px">px</option>
                  </select>
                </div>
                <Button onClick={applyCustomSize} className="ml-2">
                  Apply
                </Button>
              </div>
            )}
          </div>
        </div>
        <div className="flex justify-end">
          <Button onClick={handleGenerateQRCode}>Generate QR Code</Button>
        </div>
      </div>

      {/* Right Section */}
      <div className="relative">
        <h1 className="text-2xl font-bold">Your Tag</h1>
        <Button
          onClick={toggleMaximize}
          className="absolute top-0 right-0 mt-2 mr-2"
        >
          {isMaximized ? "Minimize" : "Maximize"}
        </Button>
        <div
          id="printable-preview"
          className={`border border-gray-300 rounded-md mt-4 relative overflow-hidden bg-gray-100 ${isMaximized ? "w-full h-full fixed inset-0 z-50" : ""
            }`}
          style={{
            width: isMaximized ? "100%" : paperSize ? `${paperSize.width * scale}px` : "400px",
            height: isMaximized ? "100%" : paperSize ? `${paperSize.height * scale}px` : "auto",
            transform: `scale(${isMaximized ? 1 : scale})`,
            transformOrigin: "top left",
            position: "relative",
          }}

          onClick={(e) => e.stopPropagation()}
        >
          {previewData &&
            Object.entries(previewData).map(([key, value]) => (
              <Draggable
                key={key}
                onDrag={(e, data) => preventOverlap(data, e.target)}
              >
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
