import { HomePage, PersonsPage, GroupsPage, TasksPage, ProfilePage } from './pages';
import { withNavigationWatcher } from './contexts/navigation';

const routes = [
    {
        path: '/tasks',
        element: TasksPage
    },
    {
        path: '/profile',
        element: ProfilePage
    },
    {
        path: '/home',
        element: HomePage
    },
    {
        path: '/groups',
        element: GroupsPage
    },
    {
        path: '/persons',
        element: PersonsPage
    }
    
];

export default routes.map(route => {
    return {
        ...route,
        element: withNavigationWatcher(route.element, route.path)
    };
});
