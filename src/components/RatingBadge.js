
import { FaStar, FaStarHalfAlt } from "react-icons/fa";


export default function RatingBadge({ rating = 0 }) {
  const fullStars = Math.floor(rating);
  const hasHalf = rating - fullStars >= 0.25 && rating - fullStars < 0.75;
  const rounded = Number(rating).toFixed(1);
  const pct = Math.max(0, Math.min(100, (rating / 5) * 100));

  return (
    <div className="flex items-center space-x-4 py-4">
      {/* Left: stars + numeric */}
      <div className="flex flex-col">
        <div className="flex items-center space-x-2">
          <div className="flex items-center">
            {[1, 2, 3, 4, 5].map((i) => {
              if (i <= fullStars) {
                return (
                  <FaStar
                    key={i}
                    className="text-yellow-500 w-5 h-5"
                    aria-hidden="true"
                  />
                );
              }
              if (i === fullStars + 1 && hasHalf) {
                return (
                  <FaStarHalfAlt
                    key={i}
                    className="text-yellow-500 w-5 h-5"
                    aria-hidden="true"
                  />
                );
              }
              return (
                <FaStar
                  key={i}
                  className="text-gray-300 w-5 h-5"
                  aria-hidden="true"
                />
              );
            })}
          </div>

          <div className="flex flex-col -space-y-0.5">
            <span className="text-lg font-semibold tracking-tight">
              {rounded}
            </span>
            <span className="text-xs text-gray-500">out of 5</span>
          </div>
        </div>

        {/* Progress bar */}
        <div className="mt-2 w-full max-w-xs">
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-2 bg-yellow-400 rounded-full transition-all duration-300"
              style={{ width: `${pct}%` }}
            />
          </div>
        </div>
      </div>

      {/* Right: reviews count */}
      {/* <div className="ml-2">
        <div className="inline-flex items-center px-3 py-1 rounded-full bg-gray-100 text-gray-700 text-sm font-medium shadow-sm">
          <span className="mr-2 text-sm font-semibold">{count}</span>
          <span className="text-xs">reviews</span>
        </div>
      </div> */}
    </div>
  );
}
