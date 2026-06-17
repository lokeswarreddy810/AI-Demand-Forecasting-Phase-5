import { useState } from "react";

function NotificationPreferenceForm({
  onSave
}) {
  const [preferences, setPreferences] =
    useState({
      email_notifications: true,
      forecast_alerts: true,
      workflow_alerts: true,
      executive_alerts: true
    });

  const handleChange = (e) => {
    setPreferences({
      ...preferences,
      [e.target.name]:
        e.target.checked
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(preferences);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white dark:bg-[#1e1e1e] rounded-xl shadow-md p-6"
    >
      <h2 className="text-2xl font-bold text-[#123f1f] dark:text-white mb-5">
        Notification Preferences
      </h2>

      <div className="space-y-4">
        <label className="flex items-center gap-3">
          <input
            type="checkbox"
            name="email_notifications"
            checked={
              preferences.email_notifications
            }
            onChange={handleChange}
          />
          Email Notifications
        </label>

        <label className="flex items-center gap-3">
          <input
            type="checkbox"
            name="forecast_alerts"
            checked={
              preferences.forecast_alerts
            }
            onChange={handleChange}
          />
          Forecast Alerts
        </label>

        <label className="flex items-center gap-3">
          <input
            type="checkbox"
            name="workflow_alerts"
            checked={
              preferences.workflow_alerts
            }
            onChange={handleChange}
          />
          Workflow Alerts
        </label>

        <label className="flex items-center gap-3">
          <input
            type="checkbox"
            name="executive_alerts"
            checked={
              preferences.executive_alerts
            }
            onChange={handleChange}
          />
          Executive Alerts
        </label>
      </div>

      <button
        type="submit"
        className="mt-6 bg-[#9dff00] text-[#032b11] px-5 py-2 rounded-xl font-bold"
      >
        Save Preferences
      </button>
    </form>
  );
}

export default NotificationPreferenceForm;