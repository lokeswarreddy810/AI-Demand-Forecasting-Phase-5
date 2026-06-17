function NotificationHistoryTable({
  notifications = []
}) {
  return (
    <div className="overflow-x-auto rounded-xl border border-green-200 dark:border-gray-700">
      <table className="w-full bg-white dark:bg-[#1e1e1e]">
        <thead className="bg-[#f5fff0] dark:bg-[#2a2a2a]">
          <tr>
            <th className="p-4 text-left text-[#123f1f] dark:text-white">
              Title
            </th>

            <th className="p-4 text-left text-[#123f1f] dark:text-white">
              Type
            </th>

            <th className="p-4 text-left text-[#123f1f] dark:text-white">
              User
            </th>

            <th className="p-4 text-left text-[#123f1f] dark:text-white">
              Status
            </th>

            <th className="p-4 text-left text-[#123f1f] dark:text-white">
              Created At
            </th>
          </tr>
        </thead>

        <tbody>
          {notifications.length === 0 ? (
            <tr>
              <td
                colSpan="5"
                className="text-center py-8 text-gray-500"
              >
                No notification history available
              </td>
            </tr>
          ) : (
            notifications.map(
              (notification) => (
                <tr
                  key={notification.id}
                  className="border-t border-green-100 dark:border-gray-700"
                >
                  <td className="p-4 text-gray-800 dark:text-gray-200">
                    {notification.title}
                  </td>

                  <td className="p-4 text-gray-800 dark:text-gray-200">
                    {notification.notification_type}
                  </td>

                  <td className="p-4 text-gray-800 dark:text-gray-200">
                    {notification.user_id}
                  </td>

                  <td className="p-4">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-bold ${
                        notification.is_read
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {notification.is_read
                        ? "Read"
                        : "Unread"}
                    </span>
                  </td>

                  <td className="p-4 text-gray-800 dark:text-gray-200">
                    {notification.created_at}
                  </td>
                </tr>
              )
            )
          )}
        </tbody>
      </table>
    </div>
  );
}

export default NotificationHistoryTable;