import React, { lazy, Suspense } from "react";
import ReactDOM from "react-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import LoadingAnimationCS from "./lotties-cs/LoadingAnimationCS";
import { GlobalContexProvider } from "./globalContext";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: true,
    },
  },
});

const App = lazy(() => import("./App"));

ReactDOM.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <GlobalContexProvider>
          <Suspense
            fallback={
              <div
                style={{ height: "100vh", backgroundColor: "#182542" }}
                className="w-100 d-flex justify-content-center align-items-center"
              >
                <LoadingAnimationCS
                  size={{ height: 500, width: 500 }}
                  type="world"
                />
              </div>
            }
          >
            <App />
          </Suspense>
        </GlobalContexProvider>
      </BrowserRouter>
    </QueryClientProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
