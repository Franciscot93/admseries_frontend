import { useState } from "react";

function ErrorForm({ mensaje }) {
  const [isOvered, setIsOvered] = useState(false);

  return (
    <div
      className={`text-center  absolute lg:top-1 lg:right-2 sm:top-2  sm:right-0 md:top-7 md:right-16 `}
      onMouseEnter={() => setIsOvered(true)}
      onMouseLeave={() => setIsOvered(false)}
    >
      <div className={`bg-red-100 ${isOvered ? "z-50" : null} rounded`}>
        <span
          className={`bg-red-100 text-center text-red-600 text-xs font-medium transition-all ${
            isOvered ? "z-50" : null
          } px-2.5 py-0.5 rounded`}
        >
          {isOvered ? `❌ ${mensaje}` : "❌"}
        </span>
      </div>
    </div>
  );
}

export default ErrorForm;
