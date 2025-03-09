import { useState } from "react";
import Routing from "./Utils/Routes";

import { BrowserRouter } from "react-router-dom";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";

const queryClient = new QueryClient();

export default function App() {
  const [session, setSession] = useState(null);
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <div className="flex flex-col h-full w-full">
          <div className="sticky w-full">
            {/* <HomeNav session={session} setSession={setSession}/> */}
          </div>
          <div className="w-full min-h-[100vh]">
            <Routing session={session} setSession={setSession} />
          </div>
        </div>
      </BrowserRouter>
    </QueryClientProvider>
  );
}
