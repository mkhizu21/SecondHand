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

    return true;
}

function validateSignUp() {
    var fullName = document.getElementById('fullName').value;
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;
    var confirmPassword = document.getElementById('confirmPassword').value;
    var age = document.getElementById('age').value;
    var gender = document.getElementById('gender').value;
    var address = document.getElementById('address').value;

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

    if (age < 18 || age > 100) {
        alert('Age must be between 18 and 100');
        return false;
    }

    if (gender === '') {
        alert('Please select a gender');
        return false;
    }

    if (address.trim() === '') {
        alert('Please enter your address');
        return false;
    }

    return true;
}

document.addEventListener('DOMContentLoaded', function() {
    var tabs = document.querySelectorAll('nav ul li a');
    tabs.forEach(function(tab) {
        tab.addEventListener('click', function(e) {
            e.preventDefault();
            var target = this.getAttribute('href').substring(1);
            var forms = document.querySelectorAll('.form-container');
            forms.forEach(function(form) {
                form.classList.remove('active');
            });
            document.getElementById(target).classList.add('active');
        });
    });
});


// Script for making animation
document.addEventListener("DOMContentLoaded", function() {
    const text = document.getElementById('animation_text'); // Get the element containing the text
    const content = text.textContent;
    text.textContent = '';
    for (let i = 0; i < content.length; i++) {
        const span = document.createElement('span');
        if (content[i] === ' ') { // Check if the character is a space
            span.innerHTML = '&nbsp;'; // Use non-breaking space entity
        } else {
            span.textContent = content[i];
        }
        text.appendChild(span);
    }
});

