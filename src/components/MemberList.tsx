import { useMemberStore } from "../store/memberStore";
import type { Member } from "../types";

type MemberListProps = {
  kw: string;
  setEditing: (m: Member | null) => void;
};

const MemberList: React.FC<MemberListProps> = ({ kw, setEditing }) => {
  const members = useMemberStore((s) => s.members);
  const remove = useMemberStore((s) => s.remove);

  const filtered = kw.trim()
    ? members.filter((m) =>
        [m.fullName, m.party, m.ministerRole ?? "", m.ministry ?? ""].some((v) =>
          v.toLowerCase().includes(kw.trim().toLowerCase())
        )
      )
    : members;

  if (filtered.length === 0) {
    return <div className="p-8 text-center text-gray-500">ไม่พบรายการ</div>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-gray-100 text-gray-700">
            <th className="px-3 py-2 text-left">ชื่อ-สกุล</th>
            <th className="px-3 py-2 text-left">พรรค</th>
            <th className="px-3 py-2 text-left">ตำแหน่ง</th>
            <th className="px-3 py-2 text-left">กระทรวง</th>
            <th className="px-3 py-2 text-right">การจัดการ</th>
          </tr>
        </thead>
        <tbody className="bg-white">
          {filtered.map((m) => (
            <tr key={m.id} className="border-b last:border-b-0 hover:bg-gray-50">
              <td className="px-3 py-2 font-medium text-gray-900">{m.fullName}</td>
              <td className="px-3 py-2">{m.party}</td>
              <td className="px-3 py-2">{m.ministerRole || "-"}</td>
              <td className="px-3 py-2">{m.ministry || "-"}</td>
              <td className="px-3 py-2 text-right space-x-2">
                <button className="btn-outline" onClick={() => setEditing(m)}>แก้ไข</button>
                <button className="btn-outline" onClick={() => remove(m.id)}>ลบ</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MemberList;
