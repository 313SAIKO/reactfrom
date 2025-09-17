import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMemberStore } from "../store/memberStore";
import type { Member } from "../types";

const MemberSchema = z.object({
  fullName: z.string().trim().min(2, "กรุณากรอกชื่อ-สกุล"),
  party: z.string().trim().min(1, "กรุณาระบุสังกัดพรรค"),
  ministerRole: z.string().trim().optional().or(z.literal("")),
  ministry: z.string().trim().optional().or(z.literal("")),
  workHistory: z.string().trim().optional().or(z.literal("")),
  achievements: z.string().trim().optional().or(z.literal("")),
});

export type MemberInput = z.infer<typeof MemberSchema>;

type MemberFormProps = {
  editing: Member | null;
  setEditing: (m: Member | null) => void;
};

const MemberForm: React.FC<MemberFormProps> = ({ editing, setEditing }) => {
  const add = useMemberStore((s) => s.add);
  const update = useMemberStore((s) => s.update);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<MemberInput>({
    resolver: zodResolver(MemberSchema),
    defaultValues: {
      fullName: "",
      party: "",
      ministerRole: "",
      ministry: "",
      workHistory: "",
      achievements: "",
    },
  });

  useEffect(() => {
    if (editing) {
      const { id, ...rest } = editing;
      reset(rest);
    } else {
      reset();
    }
  }, [editing, reset]);

  const onSubmit = (data: MemberInput) => {
    if (editing) {
      update(editing.id, data);
    } else {
      add(data);
    }
    reset();
    setEditing(null);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="section-title">{editing ? "แก้ไขข้อมูล ส.ส." : "เพิ่มรายชื่อ ส.ส."}</h2>
        {editing && (
          <button type="button" className="btn btn-outline" onClick={() => reset()}>
            ล้างค่า
          </button>
        )}
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="label">ชื่อ-สกุล *</label>
          <input className="input" placeholder="เช่น นายสมชาย ใจดี" {...register("fullName")} />
          {errors.fullName && <p className="text-sm text-red-600 mt-1">{errors.fullName.message}</p>}
        </div>
        <div>
          <label className="label">สังกัดพรรค *</label>
          <input className="input" placeholder="ชื่อพรรค" {...register("party")} />
          {errors.party && <p className="text-sm text-red-600 mt-1">{errors.party.message}</p>}
        </div>
        <div>
          <label className="label">ตำแหน่งรัฐมนตรี (ถ้ามี)</label>
          <input className="input" placeholder="เช่น รัฐมนตรีช่วยว่าการฯ" {...register("ministerRole")} />
        </div>
        <div>
          <label className="label">กระทรวง (ถ้ามี)</label>
          <input className="input" placeholder="เช่น กระทรวงคมนาคม" {...register("ministry")} />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="label">ประวัติการทำงาน</label>
          <textarea className="input min-h-28" placeholder="สรุปประวัติย่อ" {...register("workHistory")} />
        </div>
        <div>
          <label className="label">ผลงานที่ผ่านมา</label>
          <textarea className="input min-h-28" placeholder="โครงการ/กฎหมาย/นโยบายที่โดดเด่น" {...register("achievements")} />
        </div>
      </div>

      <div className="flex gap-3 pt-1">
        <button type="submit" className="btn-primary" disabled={isSubmitting}>
          {editing ? "บันทึกการแก้ไข" : "เพิ่มรายชื่อ"}
        </button>
        {editing && (
          <button type="button" className="btn-outline" onClick={() => setEditing(null)}>
            ยกเลิก
          </button>
        )}
      </div>
    </form>
  );
};

export default MemberForm;
