function signedIn(username: string, token: string) {
  localStorage.setItem('username', username);
  localStorage.setItem('token', token);
}

function signOff() {
  localStorage.clear();
}

function isSignedIn(): Boolean {
  return (localStorage.getItem('username') && localStorage.getItem('token')) ? true : false;
}

function getUsername(): string | null {
  return localStorage.getItem('username');
}

function getToken(): string | null {
  return localStorage.getItem('token');
}

export { signedIn, signOff, isSignedIn, getUsername, getToken };