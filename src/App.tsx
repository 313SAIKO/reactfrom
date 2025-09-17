import { useState } from "react";
import MemberForm from "./components/MemberForm";
import MemberList from "./components/MemberList";
import EmptyState from "./components/EmptyState";
import { useMemberStore } from "./store/memberStore";
import type { Member } from "./types";

export default function App() {
  const [editing, setEditing] = useState<Member | null>(null);
  const [kw, setKw] = useState("");
  const count = useMemberStore((s) => s.members.length);

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="container py-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-gray-900">
              ทำเนียบสมาชิกสภาผู้แทนราษฎร
            </h1>
            <p className="text-gray-600 mt-1">
              เพิ่ม / แสดง / แก้ไข / ลบ 
            </p>
          </div>
          <div className="flex gap-2">
            <input
              className="input w-64"
              placeholder="ค้นหาชื่อ / พรรค / ตำแหน่ง"
              value={kw}
              onChange={(e) => setKw(e.target.value)}
            />
          </div>
        </div>
      </header>

      <main className="container space-y-6 pb-12">
        <div className="card p-6">
          <MemberForm editing={editing} setEditing={setEditing} />
        </div>

        <section className="space-y-3 card p-0 overflow-hidden">
          <div className="flex items-center justify-between p-4">
            <h2 className="section-title">รายชื่อทั้งหมด ({count.toLocaleString()})</h2>
          </div>
          {count === 0 ? (
            <EmptyState />
          ) : (
            <div className="px-4 pb-4">
              <MemberList kw={kw} setEditing={setEditing} />
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
