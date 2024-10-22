import { FiUploadCloud } from "react-icons/fi";


function FileSelect({ label }) {

    return (
        <div className="hover:bg-gray-200  duration-300 flex-col border-2 border-dashed border-gray-300 rounded-lg">
            <label
                htmlFor={label}
                className="ml-1 text-blue-500  flex justify-center p-5 items-center flex-col hover:text-blue-600 cursor-pointer focus:outline-none focus:underline"
            >
                <FiUploadCloud className="w-16 h-16 text-gray-400 mb-3" />
                <p className="text-gray-600 text-center ">
                    Drag and drop your Aadhar card image here, or
                    browse files
                </p>
            </label>
        </div>
    )
}


export default FileSelect