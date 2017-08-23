import { Course, Interactive } from './components/course';
import { Dashboard, DashboardContent, DashboardCourses, DashboardComments, Transcribe, Transcribed } from './components/dashboard';
import { Exam, ProblemSet } from './components/exam';
import Home from './components/home';
import { Login, Logout, SecretSignup, Signup } from './components/login';
import NotFound from './components/notfound';
import { AppSubmitted, Marketing, MarketingApps } from './components/marketing';
import Profile from './components/profile';
import School from './components/school';
import UserHome from './components/userhome';

const routes = [
  { path: '/', component: Home, exact: true },
  { path: '/login', component: Login },
  { path: '/logout', component: Logout },
  { path: '/signup', component: Signup },
  { path: '/marketing', component: Marketing },
  { path: '/profile', component: UserHome },
  { path: '/dashboard/comments', component: DashboardComments },
  { path: '/dashboard/courses', component: DashboardCourses },
  { path: '/dashboard/content', component: DashboardContent },
  { path: '/dashboard/transcribed', component: Transcribed },
  { path: '/dashboard/transcribe', component: Transcribe },
  { path: '/dashboard', component: Dashboard },
  { path: '/appsubmitted', component: AppSubmitted },
  { path: '/s3cr3tsignup', component: SecretSignup },
  { path: '/m4rk3t1ng4pp5', component: MarketingApps },
  { path: '/home', component: UserHome },
  { path: '/:schoolCode/:courseCode/problemset/:problemSetType', component: ProblemSet },
  { path: '/:schoolCode/:courseCode/problemset', component: Interactive },
  { path: '/:schoolCode/:courseCode/:examStr', component: Exam },
  { path: '/:schoolCode/:courseCode', component: Course },
  { path: '/:schoolCode', component: School },
  { path: '/', component: NotFound },
];

export default routes;
