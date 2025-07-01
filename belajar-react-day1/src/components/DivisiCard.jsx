export default function DivisiCard({ nama }) {
  return (
    <div className="bg-white border rounded p-4 shadow hover:shadow-md cursor-pointer">
      <p className="font-medium text-gray-800">{nama}</p>
    </div>
  );
}
