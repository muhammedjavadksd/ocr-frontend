import React, { useState } from "react";
import { FiUser, FiCalendar, FiMapPin, FiClipboard } from "react-icons/fi";
import { RiGenderlessFill } from "react-icons/ri";
import { MdContentCopy } from "react-icons/md";

const ResultSection = () => {

    const personData = {
        aadharNumber: "1234 5678 9012",
        name: "John Doe",
        dateOfBirth: "1990-01-01",
        gender: "Male",
        address: "123 Main St, City, State",
        pinCode: "123456"
    };

    const copyToClipboard = (value) => {
        navigator.clipboard.writeText(value);
    };

    const renderField = (icon, label, value, field) => (
        <div className="flex items-center p-3 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 group">
            <div className="mr-3 text-blue-500 group-hover:text-blue-600 transition-colors duration-300">
                {icon}
            </div>
            <div className="flex-grow">
                <p className="text-sm font-medium text-gray-500">{label}</p>
                <p className="text-lg font-semibold text-gray-800">{value}</p>
            </div>
            <button
                onClick={() => copyToClipboard(value)}
                className="p-2 text-gray-400 hover:text-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-300 rounded-full transition-colors duration-300"
                aria-label={`Copy ${label}`}
            >
                <MdContentCopy size={20} />
            </button>
        </div>
    );

    return (
        <div className="w-ful">
            <div className="max-w-4xl mx-auto p-6  rounded-xl shadow-lg">



                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {renderField(
                        <FiUser size={24} />,
                        "Aadhar Number",
                        personData.aadharNumber,
                        "aadhar"
                    )}
                    {renderField(
                        <FiUser size={24} />,
                        "Name",
                        personData.name,
                        "name"
                    )}
                    {renderField(
                        <FiCalendar size={24} />,
                        "Date of Birth",
                        personData.dateOfBirth,
                        "dob"
                    )}
                    {renderField(
                        <RiGenderlessFill size={24} />,
                        "Gender",
                        personData.gender,
                        "gender"
                    )}
                    {renderField(
                        <FiMapPin size={24} />,
                        "Address",
                        personData.address,
                        "address"
                    )}
                    {renderField(
                        <FiClipboard size={24} />,
                        "Pin Code",
                        personData.pinCode,
                        "pincode"
                    )}
                </div>


                {personData && (
                    <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
                        <h2 className="text-2xl font-semibold mb-4 text-gray-800">
                            API Response
                        </h2>
                        <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto">
                            <code>{JSON.stringify(personData, null, 2)}</code>
                        </pre>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ResultSection;
