type haveCookedBoxProps = {
  haveCooked: boolean;
};

export default function haveCookedBox({ haveCooked }: haveCookedBoxProps) {
  return (
    <div className="absolute top-3 right-3 flex items-center space-x-2">
      <label htmlFor="cooked" className="text-lg font-semibold">
        Cooked?
      </label>
      <div className="relative">
        <input
          type="checkbox"
          id="cooked"
          checked={haveCooked}
          readOnly
          // className="w-4 h-4 accent-green-600 cursor-pointer"
          className="sr-only peer"
        />
        <div className="w-10 h-5 bg-gray-300 peer-checked:bg-green-500 rounded-full transition duration-300"></div>
        <div className="absolute top-1 left-1 w-3 h-3 bg-white rounded-full transition-transform duration-300 peer-checked:translate-x-5"></div>
      </div>
    </div>
  );
}
