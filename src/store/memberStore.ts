import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Member } from "../types";

interface MemberState {
  members: Member[];
  add: (data: Omit<Member, "id">) => void;
  update: (id: string, data: Omit<Member, "id">) => void;
  remove: (id: string) => void;
  clearAll: () => void;
}

const seed: Member[] = [
  {
    id: crypto.randomUUID(),
    fullName: "นิว (ตัวอย่าง) ใจดี",
    party: "พรรคตัวอย่าง",
    ministerRole: "รัฐมนตรีช่วย",
    ministry: "กระทรวงดิจิทัล",
    workHistory: "อดีตวิศวกรซอฟต์แวร์ / ที่ปรึกษานโยบาย",
    achievements: "ผลักดันกฎหมายข้อมูลเปิด, โครงการอินเทอร์เน็ตชุมชน",
  },
];

export const useMemberStore = create<MemberState>()(
  persist(
    (set) => ({
      members: seed,
      add: (data) => set((s) => ({ members: [...s.members, { id: crypto.randomUUID(), ...data }] })),
      update: (id, data) => set((s) => ({ members: s.members.map((m) => (m.id === id ? { ...m, ...data } : m)) })),
      remove: (id) => set((s) => ({ members: s.members.filter((m) => m.id !== id) })),
      clearAll: () => set({ members: [] }),
    }),
    { name: "mp-directory" }
  )
);
