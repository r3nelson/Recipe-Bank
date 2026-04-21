type SectionHeaderProps = {
  header: string;
};

export default function SectionHeader({ header }: SectionHeaderProps) {
  return (
    <div className="flex items-center my-4">
      <div className=" flex-grow border-t border-black"></div>
      <span className="px-4 text-black font-semibold">{header}</span>
      <div className="flex-grow border-t border-black"></div>
    </div>
  );
}
