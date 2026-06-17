function AnnouncementCard({ announcement }) {
  return (
    <div className="bg-white dark:bg-[#1e1e1e] rounded-xl shadow-md p-5 border-l-4 border-[#9dff00]">
      <h3 className="text-xl font-bold text-[#123f1f] dark:text-white">
        {announcement.title}
      </h3>

      <p className="mt-3 text-gray-700 dark:text-gray-300">
        {announcement.message}
      </p>

      <div className="mt-4 text-sm text-gray-500">
        Posted By: {announcement.created_by}
      </div>

      <div className="text-sm text-gray-500">
        {announcement.created_at}
      </div>
    </div>
  );
}

export default AnnouncementCard;