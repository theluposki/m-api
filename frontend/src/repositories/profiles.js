import config from "../config/index.js";

const searchUsersByNickname = async (nickname) => {
  if (!nickname) return { error: "Nickname é obrigatório." };

  const url = `${config.BASE_URL}/users/search-users`;

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
      body: JSON.stringify({ nickname }),
    });

    if (response.status === 401) {
      alert("Sua sessão expirou, Faça login para continuar.");
      return 401;
    }

    const result = await response.json();

    if (result.error) return result;

    return result;
  } catch (error) {
    console.error(error);
  }
};

const sendFriendRequest = async (nickname) => {
  if (!nickname) return { error: "Nickname é obrigatório." };

  const url = `${config.BASE_URL}/users/send-friend-request`;

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
      body: JSON.stringify({ to: nickname }),
    });

    if (response.status === 401) {
      alert("Sua sessão expirou, Faça login para continuar.");
      return 401;
    }

    const result = await response.json();

    if (result.error) return result;
    console.log(result);
    return result;
  } catch (error) {
    console.error(error);
  }
};

const confirmFriendRequest = async (nickname, requestId) => {
  if (!nickname) return { error: "Nickname é obrigatório." };

  const url = `${config.BASE_URL}/users/add-friend`;

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
      body: JSON.stringify({ nickname, requestId }),
    });

    if (response.status === 401) {
      alert("Sua sessão expirou, Faça login para continuar.");
      return 401;
    }

    const result = await response.json();

    if (result.error) return result;
    console.log(result);
    return result;
  } catch (error) {
    console.error(error);
  }
};

const getFriendRequest = async () => {
  const url = `${config.BASE_URL}/users/get-friends-requests`;

  try {
    const response = await fetch(url, {
      method: "GET",
      mode: "cors",
      cache: "no-cache",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      referrerPolicy: "origin",
    });

    if (response.status === 401) {
      alert("Sua sessão expirou, Faça login para continuar.");
      return 401;
    }

    const result = await response.json();

    if (result.error) return result;
    console.log(result);
    return result;
  } catch (error) {
    console.error(error);
  }
};

export {
  searchUsersByNickname,
  sendFriendRequest,
  confirmFriendRequest,
  getFriendRequest,
};
