type haveCookedBoxProps = {
  haveCooked: boolean;
};

export default function haveCookedBox({ haveCooked }: haveCookedBoxProps) {
  return (
    <div className="absolute top-3 right-3 flex items-center space-x-2">
      <label htmlFor="cooked" className="text-sm font-semibold">
        Cooked?
      </label>
      <input
        type="checkbox"
        id="cooked"
        checked={haveCooked}
        readOnly
        className="w-4 h-4 accent-green-600 cursor-pointer"
      />
    </div>
  );
}
