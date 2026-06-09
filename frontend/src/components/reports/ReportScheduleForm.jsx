import { useState } from "react";

function ReportScheduleForm({ onSubmit }) {
  const [form, setForm] = useState({
    report_type: "",
    frequency: "Monthly",
    email: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="grid md:grid-cols-4 gap-4"
    >
      <input
        placeholder="Report Type"
        value={form.report_type}
        onChange={(e) =>
          setForm({
            ...form,
            report_type: e.target.value,
          })
        }
        className="border p-3 rounded-xl"
      />

      <select
        value={form.frequency}
        onChange={(e) =>
          setForm({
            ...form,
            frequency: e.target.value,
          })
        }
        className="border p-3 rounded-xl"
      >
        <option>Daily</option>
        <option>Weekly</option>
        <option>Monthly</option>
        <option>Quarterly</option>
      </select>

      <input
        placeholder="Email"
        value={form.email}
        onChange={(e) =>
          setForm({
            ...form,
            email: e.target.value,
          })
        }
        className="border p-3 rounded-xl"
      />

      <button
        type="submit"
        className="bg-[#9dff00] px-6 py-3 rounded-xl font-bold"
      >
        Schedule
      </button>
    </form>
  );
}

export default ReportScheduleForm;