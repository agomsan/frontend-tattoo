const BASE_URL = "http://localhost:4000/api/auth";
const authService = {
  register: async function (payload) {
    return new Promise((resolve) => {
      fetch(`${BASE_URL}register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      })
        .then(async (response) => {
          const status = response.status;
          const resp = await response.json();
          resolve({ status, resp });
        })
        .catch((error) => {
          resolve({ error });
        });
    });
  },

  login: async function (payload) {
    return new Promise((resolve) => {
      fetch(`${BASE_URL}login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      })
        .then(async (response) => {
          const status = response.status;
          const resp = await response.json();
          resolve({ status, resp });
        })
        .catch((error) => {
          resolve({ error });
        });
    });
  },
};

const sleep = (t) => new Promise((r) => setTimeout(r, t));

export default authService;
