import React, { useState } from "react";
import { FiUploadCloud, FiFile, FiX } from "react-icons/fi";
import { motion } from "framer-motion";
import FileSelect from "./FileSelect";
import SelectedFile from "./SelectedFile";

const AadharUploadLandingPage = () => {
    const [file, setFile] = useState(null);
    const [file2, setFile2] = useState(null);

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [extractedData, setExtractedData] = useState(null);

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    const handleDrop = (e) => {
        e.preventDefault();
        const droppedFile = e.dataTransfer.files[0];
        validateAndSetFile(droppedFile);
    };

    const handleFileChange = (e, fileType) => {
        const file = e.target.files[0];
        if (file) {
            if (file.type === "image/jpeg" || file.type === "image/png") {
                if (fileType == "front") {
                    setFile(file);
                } else {
                    setFile2(file);
                }
                setError("");
            } else {
                setError("Please upload only JPG or PNG images.");
            }
        }
    };

    const validateAndSetFile = (file) => {
        if (file) {
            if (file.type === "image/jpeg" || file.type === "image/png") {
                setFile(file);
                setError("");
            } else {
                setError("Please upload only JPG or PNG images.");
            }
        }
    };

    const handleUpload = async () => {
        if (!file) {
            setError("Please select a file to upload.");
            return;
        }

        setLoading(true);
        // Simulating file upload and data extraction
        setTimeout(() => {
            setLoading(false);
            setExtractedData({
                name: "John Doe",
                address: "123 Main St, City, State, 12345",
                uid: "1234 5678 9012",
                dob: "01/01/1990",
                gender: "Male",
            });
        }, 2000);
    };

    const handleRemoveFile = () => {
        setFile(null);
        setError("");
        setExtractedData(null);
    };

    return (
        <div className="min-h-screen  flex items-center justify-center p-4">
            <div className="bg-white rounded-lg shadow-xl p-8 pb-0 max-w-3xl w-full">
                <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">Aadhar Card Upload & Data Extraction</h1>

                <div className=" p-8 mb-6" onDragOver={handleDragOver} onDrop={handleDrop}>
                    <div className="grid grid-cols-2  items-center gap-3 justify-center ">
                        {!file ? (
                            <FileSelect label="file-upload" />
                        ) : (
                            <SelectedFile file={file} />
                        )}
                        {!file2 ? (
                            <FileSelect label={"file-upload2"} />
                        ) : (
                            <SelectedFile file={file2} />
                        )}
                    </div>
                    <input id="file-upload" type="file" className="hidden" onChange={(event) => handleFileChange(event, "front")} accept="image/jpeg,image/png" aria-label="Upload Aadhar card image" />
                    <input id="file-upload2" type="file" className="hidden" onChange={(event) => handleFileChange(event, "back")} accept="image/jpeg,image/png" aria-label="Upload Aadhar card image" />
                </div>

                {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
            </div>
        </div>
    );
};

export default AadharUploadLandingPage;