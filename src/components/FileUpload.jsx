import React, { useState } from "react";
import "../css/components/FileUpload.css"; // import the css we wrote above

function FileUpload() {
  const [isDragOver, setIsDragOver] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState("");

  function handleFileUpload(event) {
    let fileList = event.target.files;
    onFileSelect(fileList);
  }

  function onFileDragEnter(event) {
    event.preventDefault();
    event.stopPropagation();
    setIsDragOver(true);
  }

  function onFileDragOver(event) {
    event.preventDefault();
    event.stopPropagation();
  }

  function onFileDragLeave(event) {
    event.preventDefault();
    event.stopPropagation();
    if (!event.currentTarget.contains(event.relatedTarget)) {
      setIsDragOver(false);
    }
  }

  function onFileDrop(event) {
    event.preventDefault();
    event.stopPropagation();
    setIsDragOver(false);
    let fileList = event.dataTransfer.files;
    onFileSelect(fileList);
  }

  async function onFileSelect(fileList) {
    if (!fileList || fileList.length === 0) {
      setUploadStatus("no files selected :(");
      return;
    }

    setIsUploading(true);
    setUploadStatus("");

    let journalFileList = new FormData();
    for (let i = 0; i < fileList.length; i++) {
      journalFileList.append("files", fileList[i]);
    }

    try {
      const backendUrl =
        process.env.REACT_APP_BACKEND_URL ||
        "http://localhost:3001/api/upload";

      const response = await fetch(backendUrl, {
        method: "POST",
        body: journalFileList,
      });

      if (!response.ok) throw new Error(`HTTP error! ${response.status}`);

      const result = await response.json();
      setUploadStatus(`Successfully uploaded ${fileList.length} file(s)`);
    } catch (error) {
      setUploadStatus(`Upload failed: ${error.message}`);
    } finally {
      setIsUploading(false);
    }
  }

  return (
    <div
      className={`file-upload-container ${
        isDragOver ? "ring-4 ring-blue-400" : ""
      } ${isUploading ? "opacity-50 pointer-events-none" : ""}`}
      onDragEnter={onFileDragEnter}
      onDragOver={onFileDragOver}
      onDragLeave={onFileDragLeave}
      onDrop={onFileDrop}
    >
      {/* Text */}
      <p className="file-upload-text mb-4">
        {isUploading
          ? "Uploading..."
          : isDragOver
          ? "drop files here!<3"
          : "upload your journal"}
      </p>

      {/* Upload Icon */}
      <label className="file-upload-icon">
        <span className="text-3xl text-[#705D56]">+</span>
        <input
          type="file"
          multiple
          className="file-upload-input"
          onChange={handleFileUpload}
          disabled={isUploading}
        />
      </label>

      {/* Status */}
      {uploadStatus && (
        <div
          className={`mt-4 p-2 rounded ${
            uploadStatus.includes("failed") || uploadStatus.includes("No files")
              ? "bg-red-100 text-red-700"
              : "bg-green-100 text-green-700"
          }`}
        >
          {uploadStatus}
        </div>
      )}
    </div>
  );
}

export default FileUpload;
