import React from "react";

const HistoryTab = ({ history, onLoadItem, onDeleteItem }) => {
  if (history.length === 0) {
    return (
      <div className="py-12 text-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-16 w-16 mx-auto mb-4 text-white/30"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1}
            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <p className="text-white/60 text-lg">
          No history yet. Analyze some food to see your history here.
        </p>
      </div>
    );
  }

  return (
    <div className="py-4">
      <h2 className="text-2xl font-bold mb-6 text-gradient text-center">
        Your Analysis History
      </h2>
      <div className="space-y-5">
        {history.map((item, index) => (
          <div
            key={item.id}
            className="flex flex-col md:flex-row items-center bg-white/5 rounded-xl p-4 shadow-lg border border-white/10 hover:bg-white/10 transition-all duration-300 animate-fadeSlideIn backdrop-blur-sm"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="w-20 h-20 rounded-lg overflow-hidden mb-3 md:mb-0 md:mr-5 border-2 border-indigo-500/30">
              <img
                src={item.image}
                alt="Food"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1 w-full md:w-auto">
              <div className="flex flex-col md:flex-row md:justify-between w-full">
                <div className="mb-3 md:mb-0 text-center md:text-left">
                  <p className="font-medium text-white">
                    {item.items.join(", ")}
                  </p>
                  <p className="text-sm text-white/50">{item.timestamp}</p>
                </div>
                <div className="text-center md:text-right">
                  <p className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500">
                    {item.calories} cal
                  </p>
                </div>
              </div>
            </div>
            <div className="flex gap-3 mt-3 md:mt-0 md:ml-5">
              <button
                onClick={() => onLoadItem(item)}
                className="btn btn-sm border-none bg-gradient-to-r from-blue-500 to-indigo-500 hover:shadow-lg hover:shadow-blue-500/30 text-white hover:-translate-y-1 transition-all duration-300"
              >
                Load
              </button>
              <button
                onClick={() => onDeleteItem(item.id)}
                className="btn btn-sm border-none bg-gradient-to-r from-rose-500 to-red-500 hover:shadow-lg hover:shadow-rose-500/30 text-white hover:-translate-y-1 transition-all duration-300"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HistoryTab;
