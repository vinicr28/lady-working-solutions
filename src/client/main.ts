import { addRoute, initRouter, handleRoute } from './router.js';
import { renderHeader, initHeader, updateHeaderAuth } from './components/header.js';
import { renderFooter } from './components/footer.js';

// Pages
import { renderHome, initHome } from './pages/home.js';
import { renderAbout } from './pages/about.js';
import { renderJobs, initJobs } from './pages/jobs.js';
import { renderJobDetail, initJobDetail } from './pages/job-detail.js';
import { renderApply, initApply } from './pages/apply.js';
import { renderCourses, initCourses } from './pages/courses.js';
import { renderCourseDetail, initCourseDetail } from './pages/course-detail.js';
import { renderRegisterPerson, initRegisterPerson } from './pages/register-person.js';
import { renderRegisterCompany, initRegisterCompany } from './pages/register-company.js';
import { renderLogin, initLogin } from './pages/login.js';

// Build app shell
const app = document.getElementById('app');
if (app) {
  app.innerHTML = `
    ${renderHeader()}
    <main id="page-content"></main>
    ${renderFooter()}
  `;
  initHeader();
}

// Register routes
addRoute('/', renderHome);
addRoute('/about', renderAbout);
addRoute('/jobs', renderJobs);
addRoute('/jobs/:id', renderJobDetail);
addRoute('/apply/:id', renderApply, true);
addRoute('/courses', renderCourses, true);
addRoute('/courses/:id', renderCourseDetail, true);
addRoute('/register', renderRegisterPerson);
addRoute('/register/company', renderRegisterCompany);
addRoute('/login', renderLogin);

// Page-specific init hooks
document.addEventListener('page:loaded', ((e: CustomEvent) => {
  const path = e.detail.path as string;
  if (path === '/') initHome();
  else if (path === '/jobs') initJobs();
  else if (path.startsWith('/jobs/') && !path.includes('apply')) initJobDetail();
  else if (path.startsWith('/apply/')) initApply(e.detail.params.id);
  else if (path === '/courses') initCourses();
  else if (path.startsWith('/courses/')) initCourseDetail();
  else if (path === '/register') initRegisterPerson();
  else if (path === '/register/company') initRegisterCompany();
  else if (path === '/login') initLogin();

  updateHeaderAuth();
}) as EventListener);

// Start
initRouter();
