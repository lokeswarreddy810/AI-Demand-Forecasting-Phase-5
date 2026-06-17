import { useEffect, useState } from "react";

import PageHeader from "../components/common/PageHeader";
import Loader from "../components/common/Loader";
import EmptyState from "../components/common/EmptyState";

import NotificationPreferenceForm from "../components/notifications/NotificationPreferenceForm";
import AnnouncementCard from "../components/notifications/AnnouncementCard";
import NotificationHistoryTable from "../components/notifications/NotificationHistoryTable";

import {
  getNotifications,
  getAnnouncements,
  getNotificationSummary,
  getAnnouncementSummary,
  createAnnouncement,
} from "../services/notificationCenterService";

function NotificationCenter() {
  const [notifications, setNotifications] = useState([]);
  const [announcements, setAnnouncements] = useState([]);
  const [summary, setSummary] = useState({});
  const [organizationId, setOrganizationId] = useState(
    localStorage.getItem("selectedOrgId") || ""
  );
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const [announcementForm, setAnnouncementForm] = useState({
    organization_id: "",
    title: "",
    message: "",
  });

  const loadData = async () => {
    try {
      setLoading(true);

      const notificationData = await getNotifications();
      const announcementData = await getAnnouncements();

      setNotifications(Array.isArray(notificationData) ? notificationData : []);
      setAnnouncements(Array.isArray(announcementData) ? announcementData : []);
    } catch (error) {
      console.log("Notification Load Error:", error.response?.data || error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const loadSummary = async () => {
    if (!organizationId) {
      setMessage("Please enter Organization ID");
      return;
    }

    try {
      localStorage.setItem("selectedOrgId", organizationId);

      const notificationSummary = await getNotificationSummary(organizationId);
      const announcementSummary = await getAnnouncementSummary(organizationId);

      setSummary({
        ...(notificationSummary || {}),
        total_announcements: announcementSummary?.total_announcements || 0,
        active_announcements: announcementSummary?.active_announcements || 0,
        expired_announcements: announcementSummary?.expired_announcements || 0,
      });

      setMessage("Notification summary loaded successfully");
    } catch (error) {
      console.log("Notification Summary Error:", error.response?.data || error);
      setMessage("Failed to load notification summary");
    }
  };

  const handleAnnouncementChange = (e) => {
    setAnnouncementForm({
      ...announcementForm,
      [e.target.name]: e.target.value,
    });

    if (e.target.name === "organization_id") {
      localStorage.setItem("selectedOrgId", e.target.value);
    }
  };

  const handleCreateAnnouncement = async (e) => {
    e.preventDefault();

    try {
      const payload = {
        organization_id: Number(announcementForm.organization_id),
        title: announcementForm.title,
        announcement: announcementForm.message,
      };

      console.log("Announcement Payload:", payload);

      await createAnnouncement(payload);

      setMessage("Announcement created successfully");

      setAnnouncementForm({
        organization_id: "",
        title: "",
        message: "",
      });

      loadData();
    } catch (error) {
      const detail = error.response?.data?.detail;

      console.log("Create Announcement Full Error:", detail);

      if (Array.isArray(detail)) {
        setMessage(
          detail
            .map((item) => `${item.loc?.join(".")}: ${item.msg}`)
            .join(", ")
        );
      } else {
        setMessage("Failed to create announcement");
      }
    }
  };

  const savePreferences = (data) => {
    console.log(data);
    setMessage("Notification preferences saved");
  };

  return (
    <div>
      <PageHeader
        title="Notification Center"
        subtitle="Manage notifications, announcements and user preferences."
      />

      {message && (
        <div className="mb-6 p-4 rounded-xl bg-green-100 text-green-800">
          {message}
        </div>
      )}

      <div className="grid md:grid-cols-4 gap-6 mb-8">
        <SummaryCard
          title="Total Notifications"
          value={summary.total_notifications || notifications.length || 0}
        />

        <SummaryCard
          title="Unread"
          value={summary.unread_notifications || 0}
        />

        <SummaryCard
          title="Announcements"
          value={summary.total_announcements || 0}
        />

        <SummaryCard
          title="Archived"
          value={summary.archived_notifications || 0}
        />
      </div>

      <div className="bg-white dark:bg-[#1e1e1e] p-6 rounded-2xl shadow-md mb-8">
        <h2 className="text-2xl font-bold mb-5">Organization Summary</h2>

        <div className="flex gap-4">
          <input
            type="number"
            placeholder="Organization ID"
            value={organizationId}
            onChange={(e) => setOrganizationId(e.target.value)}
            className="border p-3 rounded-xl w-full"
          />

          <button
            onClick={loadSummary}
            className="bg-[#9dff00] px-6 py-3 rounded-xl font-bold"
          >
            Load
          </button>
        </div>
      </div>

      <div className="mb-8">
        <NotificationPreferenceForm onSave={savePreferences} />
      </div>

      <div className="bg-white dark:bg-[#1e1e1e] p-6 rounded-2xl shadow-md mb-8">
        <h2 className="text-2xl font-bold mb-5">Create Announcement</h2>

        <form
          onSubmit={handleCreateAnnouncement}
          className="grid md:grid-cols-3 gap-4"
        >
          <input
            name="organization_id"
            placeholder="Organization ID"
            value={announcementForm.organization_id}
            onChange={handleAnnouncementChange}
            className="border p-3 rounded-xl"
            required
          />

          <input
            name="title"
            placeholder="Title"
            value={announcementForm.title}
            onChange={handleAnnouncementChange}
            className="border p-3 rounded-xl"
            required
          />

          <input
            name="message"
            placeholder="Message"
            value={announcementForm.message}
            onChange={handleAnnouncementChange}
            className="border p-3 rounded-xl"
            required
          />

          <button
            type="submit"
            className="bg-[#9dff00] px-6 py-3 rounded-xl font-bold"
          >
            Create Announcement
          </button>
        </form>
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-5">Announcements</h2>

        {announcements.length === 0 ? (
          <EmptyState message="No announcements available" />
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {announcements.map((announcement, index) => (
              <AnnouncementCard
                key={
                  announcement.id ||
                  announcement.announcement_id ||
                  `${announcement.title || "announcement"}-${index}`
                }
                announcement={announcement}
              />
            ))}
          </div>
        )}
      </div>

      <div className="bg-white dark:bg-[#1e1e1e] p-6 rounded-2xl shadow-md">
        <h2 className="text-2xl font-bold mb-5">Notification History</h2>

        {loading ? (
          <Loader />
        ) : notifications.length === 0 ? (
          <EmptyState message="No notifications available" />
        ) : (
          <NotificationHistoryTable notifications={notifications} />
        )}
      </div>
    </div>
  );
}

function SummaryCard({ title, value }) {
  return (
    <div className="bg-white dark:bg-[#1e1e1e] rounded-2xl shadow-md p-6">
      <p className="text-gray-500">{title}</p>

      <h2 className="text-3xl font-bold text-[#123f1f] mt-2">{value}</h2>
    </div>
  );
}

export default NotificationCenter;