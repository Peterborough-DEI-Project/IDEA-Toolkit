import { useState } from "react";
import Routing from "./Utils/Routes";

import { BrowserRouter } from "react-router-dom";
import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";

const queryClient = new QueryClient();

export default function App() {
  const [session, setSession] = useState(null);
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <div className="w-full h-full">
          <div className="sticky w-full">
            {/* <HomeNav session={session} setSession={setSession}/> */}
          </div>
          <div className="w-full h-full">
            <Routing session={session} setSession={setSession} />
          </div>
        </div>
      </BrowserRouter>
    </QueryClientProvider>
  );
}
