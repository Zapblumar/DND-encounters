const users = []
async function loginFormHandler(event) {
  event.preventDefault();
  const userName = document.querySelector('#userName-login').value.trim();
  const email = document.querySelector('#email-login').value.trim();
  const password = document.querySelector('#password-login').value.trim();

  if (email && password) {
    console.log(userName, email, password)
    const response = await fetch('/signin', {
      method: 'post',
      body: JSON.stringify({
        userName,
        email,
        password
      }),
      headers: { 'Content-Type': 'application/json' }

    })

    console.log(await response.json())
    if (response.ok) {
      //debugger
      document.location.replace('/chat');
    } else {
      alert((await response.json()).message);
    }
  }
}

document.querySelector(".login-form").addEventListener('submit', loginFormHandler);