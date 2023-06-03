import config from '../config/index.js'

const signInRepo = async (email, password) => {
  if (!email) return { error: "E-mail é obrigatório." };
  if (!password) return { error: "Senha é obrigatória." };

  const url = `${config.BASE_URL}/auth`

  try {
    const response = await fetch(url, {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      referrerPolicy: "origin",
      body: JSON.stringify({ email, password}),
    });

    if (response.headers.has("Set-Cookie")) {
      const cookies = response.headers.get("Set-Cookie").split(",");
      cookies.forEach((cookie) => {
        document.cookie = cookie;
      });
    }

    const result = await response.json();
  
    if (result.error) return result

    return result
  } catch (error) {
    console.error(error);
  }
};

export { signInRepo };
