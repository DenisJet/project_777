export default function Select({
  setSortField,
}: {
  setSortField: (value: string) => void;
}) {
  return (
    <select
      name="select"
      className="bg-slate-700 cursor-pointer rounded-md"
      onChange={(e) => setSortField(e.target.value)}
    >
      <option value="id">id</option>
      <option value="name">name</option>
      <option value="price">price</option>
      <option value="stock">stock</option>
      <option value="brand">brand</option>
      <option value="rating">rating</option>
      <option value="reviews_count">reviews_count</option>
      <option value="barcode">barcode</option>
    </select>
  );
}
