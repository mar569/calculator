
import ClipLoader from 'react-spinners/ClipLoader';

export default function LoadingScreen() {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-90 z-50">
            <div className="text-center">
                <ClipLoader color="#4F46E5" size={50} />

            </div>
        </div>
    );
}
