type DirectionsProps = {
  directions: string[];
};

export default function Directions({ directions }: DirectionsProps) {
  return (
    <ol className="list-decimal text-left">
      {directions.map((direction, index) => (
        <li key={index}>
          {direction.slice(0, 1).toUpperCase() + direction.slice(1)}
        </li>
      ))}
    </ol>
  );
}
