function login() {
  const user = document.getElementById("username").value;
  const pass = document.getElementById("password").value;

  if (user === "admin" && pass === "123456") {
    localStorage.setItem("isLogin", "true");
    window.location.href = "dashboard.html";
  } else {
    document.getElementById("error").innerText = "Login gagal!";
  }
}

if (window.location.pathname.includes("dashboard")) {
  if (!localStorage.getItem("isLogin")) {
    window.location.href = "login.html";
  }
}
