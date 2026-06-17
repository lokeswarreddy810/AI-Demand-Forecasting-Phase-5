import API from "../api/axiosConfig";

export const getNotifications = async () => {
  const response = await API.get("/notification-center/notifications");
  return response.data;
};

export const getNotificationById = async (notificationId) => {
  const response = await API.get(
    `/notification-center/notifications/${notificationId}`
  );
  return response.data;
};

export const createNotification = async (notificationData) => {
  const response = await API.post(
    "/notification-center/notifications",
    notificationData
  );
  return response.data;
};

export const updateNotification = async (notificationId, notificationData) => {
  const response = await API.put(
    `/notification-center/notifications/${notificationId}`,
    notificationData
  );
  return response.data;
};

export const deleteNotification = async (notificationId) => {
  const response = await API.delete(
    `/notification-center/notifications/${notificationId}`
  );
  return response.data;
};

export const markNotificationAsRead = async (notificationId) => {
  const response = await API.put(
    `/notification-center/notifications/read/${notificationId}`
  );
  return response.data;
};

export const archiveNotification = async (notificationId) => {
  const response = await API.put(
    `/notification-center/notifications/archive/${notificationId}`
  );
  return response.data;
};

export const getUserNotifications = async (userId) => {
  if (!userId) return [];

  const response = await API.get(
    `/notification-center/notifications/user/${userId}`
  );
  return response.data;
};

export const getOrganizationNotifications = async (organizationId) => {
  if (!organizationId) return [];

  const response = await API.get(
    `/notification-center/notifications/organization/${organizationId}`
  );
  return response.data;
};

export const getAnnouncements = async () => {
  const response = await API.get("/notification-center/announcements");
  return response.data;
};

export const getAnnouncementById = async (announcementId) => {
  const response = await API.get(
    `/notification-center/announcements/${announcementId}`
  );
  return response.data;
};

export const createAnnouncement = async (announcementData) => {
  const payload = {
    organization_id: Number(announcementData.organization_id),
    title:
      announcementData.title ||
      announcementData.announcement_title ||
      "",
    announcement:
      announcementData.announcement ||
      announcementData.message ||
      announcementData.announcement_message ||
      "",
  };

  console.log("Announcement Payload:", payload);

  const response = await API.post(
    "/notification-center/announcements",
    payload
  );

  return response.data;
};

export const updateAnnouncement = async (announcementId, announcementData) => {
  const response = await API.put(
    `/notification-center/announcements/${announcementId}`,
    announcementData
  );
  return response.data;
};

export const deleteAnnouncement = async (announcementId) => {
  const response = await API.delete(
    `/notification-center/announcements/${announcementId}`
  );
  return response.data;
};

export const getOrganizationAnnouncements = async (organizationId) => {
  if (!organizationId) return [];

  const response = await API.get(
    `/notification-center/announcements/organization/${organizationId}`
  );
  return response.data;
};

export const sendRoleNotification = async (data) => {
  const response = await API.post(
    "/notification-center/role-notification",
    data
  );
  return response.data;
};

export const sendExecutiveNotification = async (data) => {
  const response = await API.post(
    "/notification-center/executive-notification",
    data
  );
  return response.data;
};

export const getNotificationSummary = async (organizationId) => {
  if (!organizationId) {
    return {
      total_notifications: 0,
      unread_notifications: 0,
      total_announcements: 0,
      archived_notifications: 0,
    };
  }

  try {
    const response = await API.get(
      `/notification-center/summary/${organizationId}`
    );
    return response.data;
  } catch (error) {
    console.log(
      "Notification Summary API Error:",
      error.response?.data || error
    );

    const notifications = await getOrganizationNotifications(organizationId);
    const announcements = await getOrganizationAnnouncements(organizationId);

    return {
      total_notifications: Array.isArray(notifications)
        ? notifications.length
        : 0,
      unread_notifications: Array.isArray(notifications)
        ? notifications.filter((item) => item.is_read === false).length
        : 0,
      total_announcements: Array.isArray(announcements)
        ? announcements.length
        : 0,
      archived_notifications: Array.isArray(notifications)
        ? notifications.filter((item) => item.is_archived === true).length
        : 0,
    };
  }
};

export const getAnnouncementSummary = async (organizationId) => {
  if (!organizationId) {
    return {
      total_announcements: 0,
    };
  }

  try {
    const response = await API.get(
      `/notification-center/announcement-summary/${organizationId}`
    );
    return response.data;
  } catch (error) {
    console.log(
      "Announcement Summary API Error:",
      error.response?.data || error
    );

    const announcements = await getOrganizationAnnouncements(organizationId);

    return {
      total_announcements: Array.isArray(announcements)
        ? announcements.length
        : 0,
    };
  }
};