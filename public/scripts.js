function validateSignIn() {
    var username = document.getElementById('username').value.trim();
    var password = document.getElementById('password').value.trim();

    // Regular expressions for validation
    var usernameRegex = /^[a-zA-Z0-9_]+$/; // Allows letters, numbers, and underscores
    var passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/; // At least 8 characters long, with one uppercase letter, one lowercase letter, one number, and one special character

    if (!username.match(usernameRegex)) {
        alert('Username must contain only letters, numbers, and underscores.');
        return false;
    }

    if (!password.match(passwordRegex)) {
        alert('Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character.');
        return false;
    }
    window.location.href = "Home.html";
    return true;
}

function validateSignUp() {
    var fullName = document.getElementById('fullName').value;
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;
    var confirmPassword = document.getElementById('confirmPassword').value;
    

    // Regular expressions for validation
    var nameRegex = /^[a-zA-Z\s]+$/;
    var emailRegex = /^\S+@\S+\.\S+$/;
    var passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])(?!.*\s).{8,}$/;

    if (!fullName.match(nameRegex)) {
        alert('Please enter a valid full name');
        return false;
    }

    if (!email.match(emailRegex)) {
        alert('Please enter a valid email address');
        return false;
    }

    if (!password.match(passwordRegex)) {
        alert('Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character');
        return false;
    }

    if (password !== confirmPassword) {
        alert('Passwords do not match');
        return false;
    }

    return true;
}


fetch('/login', {
  method: 'POST',
  body: formData
})
.then(response => {
  if (response.status === 401) {
    return response.json().then(data => {
      // Redirect to login page with error message
      window.location.href = '/login?error=' + encodeURIComponent(data.error);
    });
  } else if (!response.ok) {
    throw new Error('Failed to log in');
  }
  return response.json();
})
.catch(error => {
  alert('An error occurred while logging in'); // Display generic error message
  console.error(error);
});
