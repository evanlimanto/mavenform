import { Course } from './components/course';
import { Dashboard, DashboardContent, DashboardCourses, DashboardComments, DashboardProblem, DashboardTopics, Interactive, Transcribe, Transcribed } from './components/dashboard';
import { Exam } from './components/exam';
import Home from './components/home';
import { Login, Logout, SecretSignup, Signup } from './components/login';
import NotFound from './components/notfound';
import { AppSubmitted, Marketing, MarketingApps } from './components/marketing';
import { TopicSet, Problems } from './components/topic';
import Payments from './components/payments';
import School from './components/school';
import UserHome from './components/userhome';

const routes = [
  { path: '/', component: Home, exact: true },
  { path: '/:schoolCode/:courseCode/interactive', component: TopicSet, exact: true },
  { path: '/:schoolCode/:courseCode/interactive/:topicCode', component: Problems },
  { path: '/login', component: Login },
  { path: '/logout', component: Logout },
  { path: '/signup', component: Signup },
  { path: '/marketing', component: Marketing },
  { path: '/courses', component: UserHome },
  { path: '/dashboard/interactive', component: Interactive },
  { path: '/dashboard/comments', component: DashboardComments },
  { path: '/dashboard/courses', component: DashboardCourses },
  { path: '/dashboard/problems', component: DashboardContent },
  { path: '/dashboard/problem/:problemid', component: DashboardProblem },
  { path: '/dashboard/topics', component: DashboardTopics },
  { path: '/dashboard/transcribed', component: Transcribed },
  { path: '/dashboard/transcribe/:transcribedExamId', component: Transcribe },
  { path: '/dashboard/transcribe', component: Transcribe },
  { path: '/dashboard', component: Dashboard },
  { path: '/appsubmitted', component: AppSubmitted },
  { path: '/payments', component: Payments },
  { path: '/s3cr3tsignup', component: SecretSignup },
  { path: '/m4rk3t1ng4pp5', component: MarketingApps },
  { path: '/home', component: UserHome },
  { path: '/:schoolCode/:courseCode/:examStr', component: Exam },
  { path: '/:schoolCode/:courseCode', component: Course },
  { path: '/:schoolCode', component: School },
  { path: '/', component: NotFound },
];

export default routes;
