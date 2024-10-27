import React, { useEffect, useState } from "react";
import { FiUploadCloud, FiFile, FiX } from "react-icons/fi";
import { motion } from "framer-motion";
import FileSelect from "./FileSelect";
import SelectedFile from "./SelectedFile";
import { uploadFile } from "../Api/api";
import SpinnerLoader from "./SpinnerLoader";

const AadharUploadLandingPage = ({ callback }) => {
    const [file, setFile] = useState(null);
    const [file2, setFile2] = useState(null);

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);




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
        if (!file && file2) {
            setError("Please select a file to upload.");
            return;
        }

        setLoading(true);

        callback(null)
        uploadFile(file, file2).then((data) => {
            callback(data)
        }).catch((err) => {
            setError("Something went wrong");
        }).finally(() => {
            setLoading(false);
        })
    };

    const handleRemoveFile = (state) => {
        state(null);
        setError("");
    };

    return (
        <div className="min-h-screen  flex items-center justify-center p-4">
            {loading && <SpinnerLoader />}

            <div className="bg-white rounded-lg shadow-xl p-8 pb-0 max-w-3xl w-full">
                <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">Aadhar Card Upload & Data Extraction</h1>

                <div className=" p-8 mb-2" onDragOver={handleDragOver} onDrop={handleDrop}>
                    <div className="grid grid-cols-2  items-center gap-3 justify-center ">
                        {!file ? (
                            <FileSelect label="file-upload" />
                        ) : (
                            <SelectedFile onRemove={() => handleRemoveFile(setFile)} file={file} />
                        )}
                        {!file2 ? (
                            <FileSelect label={"file-upload2"} />
                        ) : (
                            <SelectedFile onRemove={() => handleRemoveFile(setFile2)} file={file2} />
                        )}
                    </div>
                    <input id="file-upload" type="file" className="hidden" onChange={(event) => handleFileChange(event, "front")} accept="image/jpeg,image/png" aria-label="Upload Aadhar card image" />
                    <input id="file-upload2" type="file" className="hidden" onChange={(event) => handleFileChange(event, "back")} accept="image/jpeg,image/png" aria-label="Upload Aadhar card image" />
                    <button onClick={handleUpload} className="bg-blue-600 mt-5 rounded-lg p-5 w-full text-white mb-3">Submit & Extract Data</button>
                </div>


                {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
            </div>
        </div>
    );
};

export default AadharUploadLandingPage;