import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import Layout from "@/components/Layout";
import HomePage from "@/pages/HomePage";
import MapPage from "@/pages/MapPage";
import DetailsPage from "@/pages/DetailsPage";
import SuggestionsPage from "@/pages/SuggestionsPage";

function Router() {
  return (
    <Layout>
      <Switch>
        <Route path="/" component={HomePage}/>
        <Route path="/map" component={MapPage}/>
        <Route path="/details" component={DetailsPage}/>
        <Route path="/suggestions" component={SuggestionsPage}/>
        <Route component={NotFound} />
      </Switch>
    </Layout>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router />
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;
