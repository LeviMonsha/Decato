export function FeatureCardComponent({ icon: Icon, title, description }) {
  return (
    <div className="flex flex-col items-center text-center p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
      <Icon className="h-12 w-12 text-primary-600 dark:text-primary-400 mb-4" />
      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
        {title}
      </h3>
      <p className="text-gray-600 dark:text-gray-400">{description}</p>
    </div>
  );
}
