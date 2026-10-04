type PreviousButtonProps = {
  handlePrevious: () => void;
};
export default function PreviousButton({
  handlePrevious,
}: PreviousButtonProps) {
  return (
    <button className="w-1/6 p-1 hover:bg-stone-50" onClick={handlePrevious}>
      &lt;&lt; Previous
    </button>
  );
}
