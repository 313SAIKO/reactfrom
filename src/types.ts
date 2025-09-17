export interface Member {
  id: string;
  fullName: string;      // ชื่อ-สกุล
  party: string;         // สังกัดพรรค
  ministerRole?: string; // ตำแหน่งรัฐมนตรี (ถ้ามี)
  ministry?: string;     // กระทรวง (ถ้ามี)
  workHistory?: string;  // ประวัติการทำงานย่อ
  achievements?: string; // ผลงานที่ผ่านมา
}
