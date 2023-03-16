function signOut() {
    localStorage.clear();
    window.location.href = '/sign-in';
}

export default signOut;
