class Auth {
  constructor() {}

  async signUpWithEmailAndPassword(email: string, password: string) {
    const jsonDocument = {
      email: email,
      password: password,
    };
    try {
      const data = await fetch("http://localhost:3002/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(jsonDocument),
      }).then((response) =>
        response.json().then((data) => ({
          data: data,
          status: response.status,
        }))
      );
      if (data.status === 400) {
        return { status: 400, data: data.data };
      }
      if (data.status === 500) {
        return { status: 500, data: { message: "Internal Server Error" } };
      }
      const vserveAccessToken = data.data.accessToken;
      const vserveRefreshToken = data.data.refreshToken;
      const vserveUserId = data.data.userId;
      localStorage.setItem("vserveAccessToken", vserveAccessToken);
      localStorage.setItem("vserveRefreshToken", vserveRefreshToken);
      localStorage.setItem("vserveUserId", vserveUserId);
      return data;
    } catch (err) {
      console.log(err);
    }
  }
  async signInWithEmailAndPassword(email: string, password: string) {
    const jsonDocument = {
      email: email,
      password: password,
    };
    try {
      const response = await fetch("http://localhost:3002/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(jsonDocument),
      });
      if (response.status === 401) {
        return { status: 401, data: { message: "Invalid Credentials" } };
      }
      if (response.status === 403) {
        return { status: 403, data: { message: "Forbidden" } };
      }
      if (response.status === 500) {
        return { status: 500, data: { message: "Internal Server Error" } };
      }
      const data = await response.json().then((data) => ({
        data: data,
        status: response.status,
      }));
      const vserveAccessToken = data.data.accessToken;
      const vserveRefreshToken = data.data.refreshToken;
      const vserveUserId = data.data.userId;
      localStorage.setItem("vserveAccessToken", vserveAccessToken);
      localStorage.setItem("vserveRefreshToken", vserveRefreshToken);
      localStorage.setItem("vserveUserId", vserveUserId);
      return data;
    } catch (err) {
      console.log(err);
    }
  }

  isUserLoggedIn() {
    const accessToken = localStorage.getItem("vserveAccessToken");
    if (accessToken) {
      return true;
    }
    return false;
  }

  async newToken() {
    const refreshToken = localStorage.getItem("vserveRefreshToken");
    const userId = localStorage.getItem("vserveUserId");
    try {
      const response = await fetch("http://localhost:3002/auth/newtoken", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ refreshToken, userId }),
      });
      if (response.status === 401) {
        return { status: 401, data: { message: "Unauthorized" } };
      }
      if (response.status === 403) {
        return { status: 403, data: { message: "Forbidden" } };
      }
      const data = await response.json().then((data) => ({
        data: data,
        status: response.status,
      }));
      const vserveAccessToken = data.data.accessToken;
      localStorage.setItem("vserveAccessToken", vserveAccessToken);
      return data;
    } catch (err) {
      console.log(err);
    }
  }

  async signOut() {
    const accessToken = localStorage.getItem("vserveAccessToken");
    const refreshToken = localStorage.getItem("vserveRefreshToken");
    const userId = localStorage.getItem("vserveUserId");
    if (accessToken) {
      console.log("accessToken");
      try {
        const response = await fetch("http://localhost:3002/auth/signout", {
          method: "DELETE",
          headers: {
            Authorization: "Bearer " + accessToken,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ refreshToken, userId }),
        });
        if (response.status === 401) {
          console.log("401");
        }
        if (response.status === 403) {
          const authobj = new Auth();
          await authobj.newToken();
          if (
            localStorage.getItem("vserveAccessToken") !== accessToken &&
            localStorage.getItem("vserveAccessToken")
          ) {
            return await this.signOut();
          }
        }
        if (response.status === 500) {
          console.log("500");
        }

        if (response.status === 200) {
          console.log("200");
        }
        localStorage.removeItem("vserveAccessToken");
        localStorage.removeItem("vserveRefreshToken");
        localStorage.removeItem("vserveUserId");
      } catch (err) {
        console.log(err);
      }
    }
  }
}

export default Auth;
