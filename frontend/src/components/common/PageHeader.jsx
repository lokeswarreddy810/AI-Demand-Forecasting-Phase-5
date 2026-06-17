function PageHeader({
  title,
  subtitle
}) {
  return (
    <div className="mb-6">
      <h1 className="text-3xl font-bold text-green-700">
        {title}
      </h1>

      {subtitle && (
        <p className="text-gray-600 mt-1">
          {subtitle}
        </p>
      )}
    </div>
  );
}

export default PageHeader;