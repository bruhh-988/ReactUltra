import { ErrorBoundary } from "./components/common/ErrorBoundary";
import { AppProvider } from "./providers/AppProvider";
import { Toaster } from "./components/ui/sonner";

function App() {
  return (
    <ErrorBoundary>
      <AppProvider>
        <Toaster position="top-right" richColors closeButton />
        {/* Children will be rendered by RouterProvider */}
      </AppProvider>
    </ErrorBoundary>
  );
}

export default App;