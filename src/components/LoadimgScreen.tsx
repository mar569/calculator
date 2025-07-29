

export default function LoadingScreen() {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-90 z-50">
            <div className="text-center">
                <div className="w-16 h-16 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
                <p className="mt-4 text-xl font-medium text-white">Загрузка...</p>
            </div>
        </div>
    )
}
