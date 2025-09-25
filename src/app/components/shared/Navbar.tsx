export default function Navbar() {
    return (
        <header className="p-4 bg-white shadow-md flex justify-between items-center">
            <h1 className="text-lg font-semibold">Dashboard</h1>
            <div className="flex items-center space-x-4">
                <span>Halo, Admin!</span>
                <button className="p-2 bg-gray-200 rounded-md">
                    Logout
                </button>
            </div>
        </header>
    );
}