import { Fragment } from "react";
import { ImSpinner9 } from "react-icons/im";

function SpinnerLoader() {
    return (
        <div className="fixed w-full h-screen flex items-center justify-center bg-black bg-opacity-30">
            <div className="flex flex-col items-center justify-center" role="status" aria-live="polite">
                <ImSpinner9 className={`animate-spin w-12 h-12 text-blue-600`} aria-hidden="true" />
            </div>
        </div>
    )
}

export default SpinnerLoader