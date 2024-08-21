function register() {
    const userName = document.getElementById('userName').value.trim();
    const password = document.getElementById('password').value.trim();
    if(localStorage.getItem(userName.toLowerCase())){
        alert('Usuario ya existe');
        return;
    }
    if (userName && password) {
        localStorage.setItem(userName.toLowerCase(), password);
        alert('Usuario registrado con éxito');
        window.location.href = `home.html?userName=${encodeURIComponent(userName)}`;
    } else {
       alert('Diligencia todos los campos');
    }
}


function login() {
    const userName = document.getElementById('userName').value.trim();
    const password = document.getElementById('password').value.trim();
    if (!userName || !password) {
        alert('Debe diligenciar los campos');
        return;
    }
    const storedPassword = localStorage.getItem(userName.toLowerCase());

    if (storedPassword === null) {
        alert('Usuario no registrado');
    } else if (storedPassword === password) {
        alert('Inicio de sesión exitoso');
        window.location.href = `home.html?userName=${encodeURIComponent(userName)}`; 
    } else {
        alert('Contraseña incorrecta');
    }
}