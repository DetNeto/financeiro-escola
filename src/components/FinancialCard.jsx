export default function FinancialCard({
  title,
  value,
  color,
}) {
  return (
    <div className="bg-slate-800 p-6 rounded-2xl">

      <p className="text-slate-400 mb-2">
        {title}
      </p>

      <h2 className={`text-3xl font-bold ${color}`}>
        {value}
      </h2>

    </div>
  );
}