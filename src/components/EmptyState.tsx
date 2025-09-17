const EmptyState: React.FC<{ title?: string; subtitle?: string }> = ({
  title = "ยังไม่มีรายชื่อ",
  subtitle = "เริ่มเพิ่มรายชื่อ ส.ส. ได้จากแบบฟอร์มด้านบน",
}) => {
  return (
    <div className="card p-10 text-center text-gray-600">
      <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
      <p className="mt-1">{subtitle}</p>
    </div>
  );
};

export default EmptyState;
