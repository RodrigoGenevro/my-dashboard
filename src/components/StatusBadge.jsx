function StatusBadge({ label, isActive = false, variant = 'default' }) {
  let colorClass = 'border-border text-muted';

  if (isActive) {
    colorClass = 'border-primary bg-primary text-background';
  }

  if (variant === 'favorite') {
    colorClass = 'border-yellow-500/40 bg-yellow-500/15 text-yellow-500';
  }

  return (
    <span
      className={`rounded-full border px-3 py-1 text-xs font-bold ${colorClass}`}
    >
      {label}
    </span>
  );
}

export default StatusBadge;
