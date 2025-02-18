type EditButtonProps = {
  onToggleEdit: () => void;
};

export default function EditButton({ onToggleEdit }: EditButtonProps) {
  return (
    <button
      onClick={onToggleEdit}
      className="bg-yellow-500 text-white px-3 py-1 rounded-md"
    >
      Edit
    </button>
  );
}
