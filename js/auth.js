const authFeedback = document.getElementById('loginFeedback');
const registerFeedback = document.getElementById('registerFeedback');

function setFeedback(element, message, isError = false) {
  if (!element) return;
  element.textContent = message;
  element.classList.toggle('error', isError);
}

function validatePhone(phone) {
  return phone.replace(/\D/g, '').length >= 10;
}

function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function getClient() {
  const client = typeof window.getSupabaseClient === 'function' ? window.getSupabaseClient() : null;
  return client;
}

function requireClientConfig() {
  const client = getClient();
  if (!client) {
    return { ok: false, message: 'Supabase is not configured yet. Add BREWBITE_SUPABASE_URL and BREWBITE_SUPABASE_ANON_KEY before using authentication.' };
  }

  return { ok: true, client };
}



async function redirectIfAuthenticated() {
  const client = getClient();
  if (!client) return;

  const { data: { session }, error } = await client.auth.getSession();
  if (!error && session && (window.location.pathname.endsWith('/login.html') || window.location.pathname.endsWith('/register.html'))) {
    window.location.href = 'index.html';
  }
}

if (document.getElementById('loginForm')) {
  const loginForm = document.getElementById('loginForm');

  loginForm.addEventListener('submit', async function (event) {
    event.preventDefault();

    const email = document.getElementById('loginEmail')?.value.trim() || '';
    const password = document.getElementById('loginPassword')?.value || '';

    if (!email || !password) {
      setFeedback(authFeedback, 'Please enter both email and password.', true);
      return;
    }

    if (!validateEmail(email)) {
      setFeedback(authFeedback, 'Please use a valid email address.', true);
      return;
    }

    const configCheck = requireClientConfig();
    if (!configCheck.ok) {
      setFeedback(authFeedback, configCheck.message, true);
      return;
    }

    try {
      const { data, error } = await configCheck.client.auth.signInWithPassword({ email, password });

      if (error) {
        setFeedback(authFeedback, 'Login failed. Please check your email and password.', true);
        return;
      }

      setFeedback(authFeedback, 'Login successful. Redirecting…');
      window.location.href = 'index.html';
    } catch (error) {
      setFeedback(authFeedback, 'Unable to connect to Supabase right now. Please try again.', true);
    }
  });
}

if (document.getElementById('registerForm')) {
  const registerForm = document.getElementById('registerForm');

  registerForm.addEventListener('submit', async function (event) {
    event.preventDefault();

    const fullName = document.getElementById('registerName')?.value.trim() || '';
    const email = document.getElementById('registerEmail')?.value.trim() || '';
    const password = document.getElementById('registerPassword')?.value || '';
    const confirmPassword = document.getElementById('confirmPassword')?.value || '';
    const phone = document.getElementById('registerPhone')?.value.trim() || '';

    if (!fullName || !email || !password || !confirmPassword) {
      setFeedback(registerFeedback, 'Please complete all registration fields.', true);
      return;
    }

    if (!validateEmail(email)) {
      setFeedback(registerFeedback, 'Please enter a valid email address.', true);
      return;
    }

    if (phone && !validatePhone(phone)) {
      setFeedback(registerFeedback, 'Please enter a valid phone number with at least 10 digits.', true);
      return;
    }

    if (password.length < 6) {
      setFeedback(registerFeedback, 'Password must be at least 6 characters long.', true);
      return;
    }

    if (password !== confirmPassword) {
      setFeedback(registerFeedback, 'Passwords do not match. Please try again.', true);
      return;
    }

    const configCheck = requireClientConfig();
    if (!configCheck.ok) {
      setFeedback(registerFeedback, configCheck.message, true);
      return;
    }

    try {
      const { data, error } = await configCheck.client.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
            phone: phone || ''
          }
        }
      });

      if (error) {
        const errorMessage = /already|exists|taken/i.test(error.message) ? 'That email is already registered. Please use a different address.' : 'Registration failed. Please check your details and try again.';
        setFeedback(registerFeedback, errorMessage, true);
        return;
      }



      setFeedback(registerFeedback, 'Registration successful. Check your email to confirm your account, then log in.');
      registerForm.reset();
    } catch (error) {
      setFeedback(registerFeedback, 'Unable to create the account right now. Please try again.', true);
    }
  });
}

async function updateNavbarAuthState() {
  const navActions = document.querySelector('.nav-actions');
  if (!navActions) return;

  const client = getClient();
  if (!client) return;

  const { data: { session } } = await client.auth.getSession();
  const loginLink = navActions.querySelector('a[href="login.html"]');
  const registerLink = navActions.querySelector('a[href="register.html"]');
  const adminNavLink = document.querySelector('.navbar-nav a[href="admin.html"]')?.closest('.nav-item');
  const ordersNavLink = document.querySelector('.navbar-nav a[href="#orders"]')?.closest('.nav-item');

  if (session) {
    if (loginLink) loginLink.style.display = 'none';
    if (registerLink) registerLink.style.display = 'none';

    let userRole = 'customer';
    if (typeof window.getCurrentUserProfile === 'function') {
      const profile = await window.getCurrentUserProfile(client);
      if (profile && profile.role) {
        userRole = profile.role;
      }
    }

    if (userRole === 'admin') {
      if (adminNavLink) adminNavLink.style.display = '';
      if (ordersNavLink) ordersNavLink.style.display = 'none';
    } else {
      if (adminNavLink) adminNavLink.style.display = 'none';
      if (ordersNavLink) ordersNavLink.style.display = '';
    }

    if (!navActions.querySelector('[data-logout]')) {
      const logoutBtn = document.createElement('button');
      logoutBtn.className = 'btn btn-outline-primary';
      logoutBtn.type = 'button';
      logoutBtn.setAttribute('data-logout', 'true');
      logoutBtn.textContent = 'Logout';
      logoutBtn.addEventListener('click', handleLogout);
      navActions.appendChild(logoutBtn);
    }
  } else {
    if (loginLink) loginLink.style.display = '';
    if (registerLink) registerLink.style.display = '';
    if (adminNavLink) adminNavLink.style.display = 'none';
    if (ordersNavLink) ordersNavLink.style.display = '';

    const dynamicLogout = navActions.querySelector('[data-logout]');
    if (dynamicLogout) dynamicLogout.remove();
  }
}

async function handleLogout(event) {
  if (event) event.preventDefault();
  const client = getClient();

  if (!client) {
    window.location.href = 'login.html';
    return;
  }

  const { error } = await client.auth.signOut();
  if (!error) {
    window.location.href = 'login.html';
  }
}

document.querySelectorAll('[data-logout]').forEach((button) => {
  button.addEventListener('click', handleLogout);
});

document.addEventListener('DOMContentLoaded', () => {
  updateNavbarAuthState();
});

const clientForAuthState = getClient();
if (clientForAuthState) {
  clientForAuthState.auth.onAuthStateChange(() => {
    updateNavbarAuthState();
  });
}

if (document.getElementById('loginForm') || document.getElementById('registerForm')) {
  redirectIfAuthenticated();
}
