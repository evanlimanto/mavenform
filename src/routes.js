import Course from './components/course';
import { Dashboard, DashboardContent, DashboardCourses, DashboardComments, Transcribe, Transcribed } from './components/dashboard';
import Exam from './components/exam';
import Home from './components/home';
import { Login, Logout, SecretSignup, Signup } from './components/login';
import NotFound from './components/notfound';
import { AppSubmitted, Marketing, MarketingApps } from './components/marketing';
import { Math, MathContent } from './components/math';
import Profile from './components/profile';
import Upload from './components/upload';
import School from './components/school';
import UserHome from './components/userhome';
import Waitlisted from './components/waitlisted';

const routes = [
  { path: '/', component: Home, exact: true },
  { path: '/login', component: Login },
  { path: '/logout', component: Logout },
  { path: '/signup', component: Signup },
  { path: '/marketing', component: Marketing },
  { path: '/profile', component: Profile },
  { path: '/dashboard/comments', component: DashboardComments },
  { path: '/dashboard/courses', component: DashboardCourses },
  { path: '/dashboard/content', component: DashboardContent },
  { path: '/dashboard/transcribed', component: Transcribed },
  { path: '/dashboard/transcribe', component: Transcribe },
  { path: '/dashboard', component: Dashboard },
  { path: '/waitlisted', component: Waitlisted },
  { path: '/appsubmitted', component: AppSubmitted },
  { path: '/s3cr3tsignup', component: SecretSignup },
  { path: '/m4rk3t1ng4pp5', component: MarketingApps },
  { path: '/upload', component: Upload },
  { path: '/math/:topic', component: MathContent },
  { path: '/math', component: Math },
  { path: '/home', component: UserHome },
  { path: '/:schoolCode/:courseCode/:examType/:termCode', component: Exam },
  { path: '/:schoolCode/:courseCode/:topic', component: MathContent },
  { path: '/:schoolCode/:courseCode', component: Course },
  { path: '/:schoolCode', component: School },
  { path: '/', component: NotFound },
];

export default routes;
