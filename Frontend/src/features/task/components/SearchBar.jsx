const SearchBar = ({
    search,
    setSearch,
    filter,
    setFilter,
}) => {
    return (
        <div className="bg-white rounded-xl shadow p-4 mb-8 flex flex-col md:flex-row gap-4">

            <input
                type="text"
                placeholder="🔍 Search tasks..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="flex-1 border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
            />

            <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="border rounded-lg px-4 py-3"
            >
                <option value="All">All</option>
                <option value="Pending">Pending</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
            </select>

        </div>
    );
};

export default SearchBar;