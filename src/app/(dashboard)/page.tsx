import { Search, MoreHorizontal, Trash2, Edit } from 'lucide-react';

export default function DashboardPage() {
    // Sample data - replace with your actual data
    const inventoryData = [
        {
            id: 1,
            name: "Lampu Jalan",
            condition: "Customer",
            conditionColor: "text-green-600 bg-green-50",
            location: "Content curating app",
            description: "Brings all your news into one place"
        },
        {
            id: 2,
            name: "Lampu Jalan",
            condition: "Churned",
            conditionColor: "text-gray-600 bg-gray-50",
            location: "Design software",
            description: "Super lightweight design app"
        },
        {
            id: 3,
            name: "Lampu Jalan",
            condition: "Customer",
            conditionColor: "text-green-600 bg-green-50",
            location: "Data prediction",
            description: "AI and machine learning data"
        },
        {
            id: 4,
            name: "Lampu Jalan",
            condition: "Customer",
            conditionColor: "text-green-600 bg-green-50",
            location: "Productivity app",
            description: "Time management and productivity"
        }
    ];

    return (
        <div className="p-8 bg-white min-h-screen">
            {/* Header Section */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome back, Olivia</h1>
                <p className="text-gray-600">Track, manage and forecast your customers and orders.</p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-sm font-medium text-gray-700">Total inventaris</h3>
                        <button className="text-gray-400 hover:text-gray-600">
                            <MoreHorizontal className="w-4 h-4" />
                        </button>
                    </div>
                    <p className="text-3xl font-bold text-gray-900">2,420</p>
                </div>

                <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-sm font-medium text-gray-700">Total titik penempatan</h3>
                        <button className="text-gray-400 hover:text-gray-600">
                            <MoreHorizontal className="w-4 h-4" />
                        </button>
                    </div>
                    <p className="text-3xl font-bold text-gray-900">2,420</p>
                </div>

                <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-sm font-medium text-gray-700">Total inventaris kondisi baik</h3>
                        <button className="text-gray-400 hover:text-gray-600">
                            <MoreHorizontal className="w-4 h-4" />
                        </button>
                    </div>
                    <p className="text-3xl font-bold text-gray-900">2,420</p>
                </div>
            </div>

            {/* Search Bar */}
            <div className="mb-6">
                <div className="relative max-w-md">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                        type="text"
                        placeholder="Search"
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                    />
                </div>
            </div>

            {/* Inventory Table */}
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
                <div className="px-6 py-4 border-b border-gray-200">
                    <div className="grid grid-cols-12 gap-4 text-sm font-medium text-gray-700">
                        <div className="col-span-3">Nama Inventaris</div>
                        <div className="col-span-2">Kondisi</div>
                        <div className="col-span-6">Lokasi</div>
                        <div className="col-span-1"></div>
                    </div>
                </div>

                <div className="divide-y divide-gray-200">
                    {inventoryData.map((item) => (
                        <div key={item.id} className="px-6 py-4 hover:bg-gray-50">
                            <div className="grid grid-cols-12 gap-4 items-center">
                                <div className="col-span-3">
                                    <p className="font-medium text-gray-900">{item.name}</p>
                                </div>
                                
                                <div className="col-span-2">
                                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${item.conditionColor}`}>
                                        {item.condition}
                                    </span>
                                </div>
                                
                                <div className="col-span-6">
                                    <div>
                                        <p className="font-medium text-gray-900">{item.location}</p>
                                        <p className="text-sm text-gray-500">{item.description}</p>
                                    </div>
                                </div>
                                
                                <div className="col-span-1 flex items-center justify-end space-x-2">
                                    <button className="p-1 text-gray-400 hover:text-gray-600">
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                    <button className="p-1 text-gray-400 hover:text-gray-600">
                                        <Edit className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}