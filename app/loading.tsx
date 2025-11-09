export default function Loading() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center bg-background">
      <div className="text-center space-y-4">
        <div className="relative mx-auto h-16 w-16">
          {/* Outer ring */}
          <div className="absolute inset-0 rounded-full border-4 border-primary/20"></div>
          {/* Spinning ring */}
          <div className="absolute inset-0 animate-spin rounded-full border-4 border-transparent border-t-primary"></div>
          {/* Inner pulse */}
          <div className="absolute inset-2 animate-pulse rounded-full bg-primary/20"></div>
        </div>
        <div className="space-y-2">
          <p className="text-lg font-medium text-foreground animate-pulse">Loading...</p>
          <p className="text-sm text-muted-foreground">Please wait while we prepare your content</p>
        </div>
      </div>
    </div>
  )
}