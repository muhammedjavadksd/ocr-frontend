

function SelectedFile({ file }) {

    console.log(file);
    return (
        <div className=" space-x-4 hover:bg-gray-200  duration-300 flex justify-center p-5 items-center  border-2 border-dashed border-gray-300 rounded-lg">

            {file && <img
                src={URL.createObjectURL(file)}
                alt="Aadhar Card Preview"
                className="w-24 h-24 object-cover rounded-lg"
            />}
            <div>
                <p className="text-sm text-gray-600">{file?.name?.slice?.(0, 20)}...</p>
                <button
                    // onClick={handleRemoveFile}
                    className="text-red-500 hover:text-red-600 text-sm mt-1 focus:outline-none focus:underline"
                    aria-label="Remove file"
                >
                    Remove
                </button>
            </div>
        </div>
    )
}

export default SelectedFile