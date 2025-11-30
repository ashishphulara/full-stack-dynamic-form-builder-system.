import React from "react";
import { useSubmissionsQuery } from "../../../api/submissionsApi.js";

// ✅ Define proper TypeScript interface
interface SubmissionsResponse {
  items: any[];
  total: number;
}

const SubmissionsPage: React.FC = () => {
  const [page, setPage] = React.useState(1);
  const [limit, setLimit] = React.useState(10);
  const [sortOrder, setSortOrder] = React.useState<"asc" | "desc">("desc");

  const { data, isLoading, isError } = useSubmissionsQuery(
    page,
    limit,
    sortOrder,
  );

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#fef3ea]">
        <p className="text-slate-700">Loading submissions...</p>
      </div>
    );
  }

  // ✅ Type-safe data handling with optional chaining
  if (isError || !data?.items || !data?.total) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#fef3ea]">
        <p className="text-red-600">Error loading submissions.</p>
      </div>
    );
  }

  // ✅ Safe empty check
  if (data?.items.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#fef3ea]">
        <p className="text-slate-700">No submissions yet.</p>
      </div>
    );
  }

  // ✅ Safe total calculation
  const totalPages = Math.max(1, Math.ceil((data?.total || 0) / limit));

  return (
    <div className="min-h-screen bg-[#fef3ea] flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-4xl">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-xl font-semibold text-slate-900">
            Submissions ({data?.total || 0})
          </h1>

          <div className="flex items-center gap-3 text-sm">
            <label className="flex items-center gap-1">
              <span className="text-slate-700">Sort:</span>
              <select
                className="border border-slate-300 rounded px-2 py-1 text-xs"
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value as "asc" | "desc")}
              >
                <option value="desc">Newest first</option>
                <option value="asc">Oldest first</option>
              </select>
            </label>

            <label className="flex items-center gap-1">
              <span className="text-slate-700">Per page:</span>
              <select
                className="border border-slate-300 rounded px-2 py-1 text-xs"
                value={limit}
                onChange={(e) => {
                  setPage(1);
                  setLimit(Number(e.target.value));
                }}
              >
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={20}>20</option>
              </select>
            </label>
          </div>
        </div>

        {/* List of submissions */}
        <div className="space-y-4">
          {data?.items.map((item: any, index: number) => {
            const payload = item?.data ?? item;

            return (
              <div
                key={index}
                className="bg-white border border-orange-100 rounded-xl shadow-sm px-5 py-4"
              >
                <div className="grid gap-2 text-sm text-slate-800 sm:grid-cols-2">
                  {Object.entries(payload).map(([key, value]) => (
                    <div key={key} className="flex gap-1">
                      <span className="font-semibold capitalize">{key}:</span>
                      <span className="break-words">
                        {Array.isArray(value)
                          ? value.join(", ")
                          : String(value)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between mt-6 text-sm text-slate-700">
          <span>
            Page {page} of {totalPages}
          </span>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="px-3 py-1 rounded border border-slate-300 text-xs disabled:opacity-50"
            >
              Prev
            </button>
            <button
              type="button"
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="px-3 py-1 rounded border border-slate-300 text-xs disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubmissionsPage;
