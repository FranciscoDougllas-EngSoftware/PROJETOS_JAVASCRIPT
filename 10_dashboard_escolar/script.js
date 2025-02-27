// Dados fictícios (simulação de backend)
const fetchData = () => {
    return {
        students: 350,
        attendance: 92,
        classes: 15,
        teachers: 20,
        enrollments: [50, 60, 45, 70, 65, 80],
        attendanceData: [90, 91, 89, 93, 92, 94],
        gradesList: [
            { student: "João Silva", subject: "Matemática", grade: 8.5 },
            { student: "Maria Oliveira", subject: "Português", grade: 9.0 }
        ],
        messageReadRate: [60, 75, 80, 90],
        teacherHours: [160, 150, 170, 155],
        events: [
            "Reunião de Pais - 05/03/2025",
            "Feriado Escolar - 15/03/2025"
        ]
    };
};

// Função de Login
function login(event) {
    event.preventDefault();
    const form = document.getElementById('loginForm');
    const formData = new FormData(form);
    const username = formData.get('username');
    const password = formData.get('password');

    if (username === 'admin' && password === '1234') {
        window.location.href = 'dashboard.html';
    } else {
        alert('Usuário ou senha inválidos!');
    }
}

// Navegação
function navigate(page) {
    window.location.href = page;
}

// Logout
function logout() {
    window.location.href = 'index.html';
}

// Função de Matrícula
function enrollStudent(event) {
    event.preventDefault();
    const form = document.getElementById('enrollmentForm');
    const formData = new FormData(form);
    const student = Object.fromEntries(formData);
    console.log('Aluno matriculado:', student);
    alert(`Aluno ${student.name} matriculado com sucesso!`);
    form.reset();
}

// Função de Envio de Comunicado
function sendMessage() {
    const message = document.getElementById('message').value;
    if (message) {
        console.log('Comunicado enviado:', message);
        alert('Comunicado enviado com sucesso!');
        document.getElementById('message').value = '';
    } else {
        alert('Digite uma mensagem antes de enviar.');
    }
}

// Inicialização das Páginas
document.addEventListener('DOMContentLoaded', () => {
    const data = fetchData();

    // Visão Geral
    if (window.location.pathname.includes('dashboard.html')) {
        document.getElementById('students').textContent = data.students;
        document.getElementById('attendance').textContent = `${data.attendance}%`;
        document.getElementById('classes').textContent = data.classes;
        document.getElementById('teachers').textContent = data.teachers;

        new Chart(document.getElementById('enrollmentChart').getContext('2d'), {
            type: 'bar',
            data: {
                labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'],
                datasets: [{ label: 'Matrículas', data: data.enrollments, backgroundColor: '#4a90e2', borderColor: '#357abd', borderWidth: 1 }]
            },
            options: { scales: { y: { beginAtZero: true } }, plugins: { legend: { display: false } } }
        });
    }

    // Gestão Acadêmica
    if (window.location.pathname.includes('academic.html')) {
        new Chart(document.getElementById('attendanceChart').getContext('2d'), {
            type: 'line',
            data: {
                labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'],
                datasets: [{ label: 'Frequência (%)', data: data.attendanceData, borderColor: '#2ecc71', backgroundColor: 'rgba(46, 204, 113, 0.2)', fill: true }]
            },
            options: { scales: { y: { beginAtZero: true, max: 100 } } }
        });

        const tbody = document.getElementById('gradesList');
        tbody.innerHTML = '';
        data.gradesList.forEach(item => {
            tbody.innerHTML += `<tr><td>${item.student}</td><td>${item.subject}</td><td>${item.grade}</td></tr>`;
        });
    }

    // Comunicação
    if (window.location.pathname.includes('communication.html')) {
        new Chart(document.getElementById('messageChart').getContext('2d'), {
            type: 'pie',
            data: {
                labels: ['Jan', 'Fev', 'Mar', 'Abr'],
                datasets: [{ data: data.messageReadRate, backgroundColor: ['#4a90e2', '#2ecc71', '#e74c3c', '#f1c40f'] }]
            }
        });
    }

    // Gestão Administrativa
    if (window.location.pathname.includes('admin.html')) {
        const ul = document.getElementById('eventsList');
        ul.innerHTML = '';
        data.events.forEach(event => {
            ul.innerHTML += `<li>${event}</li>`;
        });

        new Chart(document.getElementById('teacherHoursChart').getContext('2d'), {
            type: 'bar',
            data: {
                labels: ['Prof. Ana', 'Prof. João', 'Prof. Maria', 'Prof. Pedro'],
                datasets: [{ label: 'Horas', data: data.teacherHours, backgroundColor: '#9b59b6' }]
            },
            options: { scales: { y: { beginAtZero: true } } }
        });
    }
});