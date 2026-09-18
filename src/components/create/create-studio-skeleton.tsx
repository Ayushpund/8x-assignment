export function CreateStudioSkeleton() {
  return (
    <div className="flex min-h-[calc(100vh-7rem)] flex-col lg:flex-row">
      <aside className="order-2 w-full shrink-0 border-t border-border-subtle bg-background lg:order-1 lg:w-studio-panel lg:border-t-0 lg:border-r">
        <div className="animate-pulse space-y-4 p-4 lg:p-5">
          <div className="h-6 w-40 rounded bg-surface-input" />
          <div className="h-24 rounded-input bg-surface-input" />
          <div className="h-10 rounded-input bg-surface-input" />
          <div className="h-10 rounded-input bg-surface-input" />
        </div>
      </aside>
      <section className="order-1 flex-1 p-4 lg:order-2 lg:p-6">
        <div className="grid animate-pulse gap-4 sm:grid-cols-2">
          <div className="aspect-square rounded-card bg-surface-input" />
          <div className="aspect-square rounded-card bg-surface-input" />
        </div>
      </section>
    </div>
  );
}
