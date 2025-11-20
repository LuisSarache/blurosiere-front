/**
 * Componente Skeleton para loading
 * Exibe placeholder enquanto dados carregam
 */

export const Skeleton = ({
  width = 'w-full',
  height = 'h-4',
  className = '',
  count = 1,
}) => {
  return (
    <div className="space-y-2">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className={`${width} ${height} ${className} bg-gray-200 rounded animate-pulse`}
        />
      ))}
    </div>
  );
};

export const SkeletonCard = () => (
  <div className="bg-white rounded-lg p-4 space-y-4">
    <Skeleton height="h-8" />
    <Skeleton count={3} />
    <Skeleton height="h-10" width="w-1/3" />
  </div>
);
