import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  Moon,
  Sun,
  User,
  Menu,
} from "lucide-react";

import NotificationBell from "../notifications/NotificationBell";
import NotificationList from "../notifications/NotificationList";
import GlobalSearch from "../GlobalSearch";

import {
  getAlerts,
  markAlertRead,
} from "../../services/notificationService";

function Navbar({
  sidebarOpen,
  setSidebarOpen,
}) {
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);

  const userName =
    localStorage.getItem("userName") || "User";

  const loadNotifications = async () => {
    try {
      const data = await getAlerts();

      const alertList = Array.isArray(data)
        ? data
        : [];

      setNotifications(alertList);

      const unread = alertList.filter(
        (item) => !item.is_read
      ).length;

      setUnreadCount(unread);
    } catch (error) {
      console.log(error);

      setNotifications([]);
      setUnreadCount(0);
    }
  };

  useEffect(() => {
    loadNotifications();

    const interval = setInterval(() => {
      loadNotifications();
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const toggleNotifications = async () => {
    const nextOpen = !open;

    setOpen(nextOpen);

    if (nextOpen) {
      try {
        const unreadAlerts =
          notifications.filter(
            (item) => !item.is_read
          );

        await Promise.all(
          unreadAlerts.map((item) =>
            markAlertRead(item.id)
          )
        );

        setNotifications((prev) =>
          prev.map((item) => ({
            ...item,
            is_read: true,
          }))
        );

        setUnreadCount(0);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const toggleDarkMode = () => {
    const root = document.documentElement;

    if (darkMode) {
      root.classList.remove("dark");
      localStorage.setItem(
        "darkMode",
        "false"
      );
    } else {
      root.classList.add("dark");
      localStorage.setItem(
        "darkMode",
        "true"
      );
    }

    setDarkMode(!darkMode);
  };

  useEffect(() => {
    const savedMode =
      localStorage.getItem("darkMode");

    if (savedMode === "true") {
      document.documentElement.classList.add(
        "dark"
      );
      setDarkMode(true);
    }
  }, []);

  return (
    <div className="sticky top-0 z-40 bg-white dark:bg-[#1e1e1e] border-b border-green-200 dark:border-gray-700 px-6 py-4 flex justify-between items-center shadow-sm">

      <div className="flex items-center gap-4">

        {setSidebarOpen && (
          <button
            onClick={() =>
              setSidebarOpen(!sidebarOpen)
            }
            className="p-2 rounded-lg hover:bg-[#f5fff0] dark:hover:bg-[#2a2a2a]"
          >
            <Menu
              size={22}
              className="text-[#123f1f] dark:text-white"
            />
          </button>
        )}

        <div className="hidden lg:flex flex-col min-w-[250px]">
          <h1 className="text-lg xl:text-xl font-bold text-[#123f1f] dark:text-white whitespace-nowrap">
            AI Demand Forecasting Platform
          </h1>
        </div>

        <div className="hidden md:block w-[400px] xl:w-[700px]">
          <GlobalSearch />
        </div>

      </div>

      <div className="flex items-center gap-3">

        <div className="relative">
          <NotificationBell
            count={unreadCount}
            onClick={toggleNotifications}
          />

          {open && (
            <div className="absolute right-0 mt-3 w-96 bg-white dark:bg-[#1e1e1e] border border-green-200 dark:border-gray-700 rounded-xl shadow-xl p-4">
              <NotificationList
                notifications={notifications}
              />
            </div>
          )}
        </div>

        <button
          onClick={toggleDarkMode}
          className="p-3 rounded-full bg-[#f5fff0] dark:bg-[#2a2a2a] hover:shadow-md transition"
        >
          {darkMode ? (
            <Sun
              size={20}
              className="text-yellow-400"
            />
          ) : (
            <Moon
              size={20}
              className="text-[#123f1f]"
            />
          )}
        </button>

        <div className="hidden md:flex items-center gap-2 px-3 py-2 rounded-xl bg-[#f5fff0] dark:bg-[#2a2a2a]">
          <User
            size={16}
            className="text-[#123f1f] dark:text-white"
          />

          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
            {userName}
          </span>
        </div>

        <button
          onClick={() =>
            navigate("/profile")
          }
          className="p-3 rounded-full bg-[#9dff00] hover:bg-[#b7ff39] transition"
        >
          <User
            size={20}
            className="text-[#032b11]"
          />
        </button>

      </div>

    </div>
  );
}

export default Navbar;