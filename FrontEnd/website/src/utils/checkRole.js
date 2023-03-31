import signOut from './sign-out';
const customerPath = ['/sign-in', '/sign-up', '/forgot-password', '/', '/tour-detail'];
const staffPath = ['/sign-in', '/sign-up', '/forgot-password', '/manage-tour'];
const adminPath = ['/sign-in', '/sign-up', '/forgot-password', '/manage-tour', '/manage-staff', '/statistic'];

function checkRole() {
    if (localStorage.role === 'customer' || !localStorage.token) {
        if (!customerPath.includes(window.location.pathname)) {
            signOut();
        }
    }
    if (localStorage.role === 'admin') {
        if (!adminPath.includes(window.location.pathname)) {
            signOut();
        }
    }
    if (localStorage.role === 'staff') {
        if (!staffPath.includes(window.location.pathname)) {
            signOut();
        }
    }
}

export default checkRole;
