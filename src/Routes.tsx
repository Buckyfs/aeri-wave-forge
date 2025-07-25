import { Suspense, lazy } from 'react';
import { Routes as RouterRoutes, Route } from 'react-router-dom';
import { LoadingSpinner } from './components/ui/loading-spinner';

// Lazy load components
const Index = lazy(() => import('./pages/Index'));
const About = lazy(() => import('./pages/About'));
const GetStarted = lazy(() => import('./pages/GetStarted'));
const Projects = lazy(() => import('./pages/Projects'));
const Community = lazy(() => import('./pages/Community'));
const Impact = lazy(() => import('./pages/Impact'));
const Collaborate = lazy(() => import('./pages/Collaborate'));
const BecomePartner = lazy(() => import('./pages/BecomePartner'));
const ApplyResearcher = lazy(() => import('./pages/ApplyResearcher'));
const Support = lazy(() => import('./pages/Support'));
const BecomeMentor = lazy(() => import('./pages/BecomeMentor'));
const NotFound = lazy(() => import('./pages/NotFound'));

// Loading component
const PageLoader = () => (
  <LoadingSpinner size="lg" variant="primary" fullScreen />
);

const Routes = () => {
  return (
    <RouterRoutes>
      <Route path="/" element={<Suspense fallback={<PageLoader />}><Index /></Suspense>} />
      <Route path="/about" element={<Suspense fallback={<PageLoader />}><About /></Suspense>} />
      <Route path="/get-started" element={<Suspense fallback={<PageLoader />}><GetStarted /></Suspense>} />
      <Route path="/projects" element={<Suspense fallback={<PageLoader />}><Projects /></Suspense>} />
      <Route path="/community" element={<Suspense fallback={<PageLoader />}><Community /></Suspense>} />
      <Route path="/impact" element={<Suspense fallback={<PageLoader />}><Impact /></Suspense>} />
      <Route path="/collaborate" element={<Suspense fallback={<PageLoader />}><Collaborate /></Suspense>} />
      <Route path="/become-partner" element={<Suspense fallback={<PageLoader />}><BecomePartner /></Suspense>} />
      <Route path="/apply-researcher" element={<Suspense fallback={<PageLoader />}><ApplyResearcher /></Suspense>} />
      <Route path="/support" element={<Suspense fallback={<PageLoader />}><Support /></Suspense>} />
      <Route path="/become-mentor" element={<Suspense fallback={<PageLoader />}><BecomeMentor /></Suspense>} />
      <Route path="*" element={<Suspense fallback={<PageLoader />}><NotFound /></Suspense>} />
    </RouterRoutes>
  );
};

export default Routes;
