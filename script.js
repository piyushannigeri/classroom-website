// User Type Detection
document.addEventListener('DOMContentLoaded', () => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    
    if(currentUser) {
        if(currentUser.type === 'teacher') {
            window.location.href = 'teacher.html';
        } else {
            window.location.href = 'student.html';
        }
    }
});

// Registration Functions
function registerStudent() {
    const student = {
        name: document.getElementById('s-name').value,
        usn: document.getElementById('s-usn').value,
        photo: document.getElementById('s-photo').files[0],
        type: 'student'
    };
    
    // Validate inputs
    if(!student.name || !student.usn || !student.photo) {
        alert('Please fill all fields!');
        return;
    }
    
    // Store in localStorage (replace with database in production)
    localStorage.setItem(student.usn, JSON.stringify(student));
    alert('Registration successful!');
    window.location.href = 'student.html';
}

function registerTeacher() {
    const teacher = {
        name: document.getElementById('t-name').value,
        subject: document.getElementById('t-subject').value,
        photo: document.getElementById('t-photo').files[0],
        type: 'teacher'
    };
    
    if(!teacher.name || !teacher.subject || !teacher.photo) {
        alert('Please fill all fields!');
        return;
    }
    
    localStorage.setItem(teacher.subject, JSON.stringify(teacher));
    alert('Registration successful!');
    window.location.href = 'teacher.html';
}

// Facial Recognition Initialization (pseudo-implementation)
async function initializeFaceRecognition() {
    const video = document.getElementById('webcam');
    
    try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        video.srcObject = stream;
    } catch (err) {
        console.error('Error accessing webcam:', err);
    }
}

// Attendance Code Generator
function generateNewCode() {
    const code = Math.random().toString(36).substr(2, 6).toUpperCase();
    const timestamp = new Date().getTime();
    
    // Store code with timestamp
    localStorage.setItem('attendanceCode', JSON.stringify({
        code,
        timestamp
    }));
    
    document.getElementById('current-code').textContent = code;
}
