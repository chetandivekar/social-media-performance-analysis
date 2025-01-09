export function Spinner() {
  return (
    <div className="flex justify-center items-center">
      <div className="relative">
        <div className="h-12 w-12 rounded-full border-2 border-purple-200 border-t-transparent animate-spin"></div>
        <div className="absolute top-0 left-0 h-12 w-12 rounded-full border-2 border-transparent border-b-purple-500 animate-pulse"></div>
        <div
          className="absolute top-0 left-0 h-12 w-12 rounded-full border-2 border-transparent border-l-pink-500 animate-pulse"
          style={{ animationDelay: "0.2s" }}
        ></div>
        <div
          className="absolute top-0 left-0 h-12 w-12 rounded-full border-2 border-transparent border-r-blue-500 animate-pulse"
          style={{ animationDelay: "0.4s" }}
        ></div>
      </div>
    </div>
  );
}
