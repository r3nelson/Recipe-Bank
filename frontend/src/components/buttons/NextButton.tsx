type NextButtonProps = {
  handleNext: () => void;
};
export default function NextButton({ handleNext }: NextButtonProps) {
  return (
    <button className="w-1/6 p-1 hover:bg-stone-50" onClick={handleNext}>
      Next &gt;&gt;
    </button>
  );
}
