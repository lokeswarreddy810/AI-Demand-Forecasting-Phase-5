import { useEffect, useState } from "react";
import {
  getNotifications,
  markNotificationAsRead,
} from "../services/notificationCenterService";

function useNotification() {
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(false);

  const loadNotifications = async () => {
    try {
      setLoading(true);

      const data = await getNotifications();
      const list = Array.isArray(data) ? data : [];

      setNotifications(list);
      setUnreadCount(
        list.filter((item) => !item.is_read).length
      );
    } catch (error) {
      console.log("Notification Hook Error:", error);
      setNotifications([]);
      setUnreadCount(0);
    } finally {
      setLoading(false);
    }
  };

  const markAsRead = async (notificationId) => {
    await markNotificationAsRead(notificationId);
    await loadNotifications();
  };

  useEffect(() => {
    loadNotifications();
  }, []);

  return {
    notifications,
    unreadCount,
    loading,
    loadNotifications,
    markAsRead,
  };
}

export default useNotification;