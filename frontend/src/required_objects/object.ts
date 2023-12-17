import Auth from "./authentication.ts";

class obj {
  name: string;
  constructor(name: string) {
    if (name != "Auth") this.name = name;
  }

  getinfo() {
    return this.name;
  }
  async addDoc(jsonDocument: JSON) {
    try {
      const accessToken = localStorage.getItem("vserveAccessToken");
      const response = await fetch("http://localhost:3001/setData", {
        method: "POST",
        headers: {
          Authorization: "Bearer " + accessToken,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ jsonDocument, database: this.name }),
      });

      if (response.status === 403) {
        const authobj = new Auth();
        await authobj.newToken();
        if (localStorage.getItem("vserveAccessToken") !== accessToken) {
          return await this.addDoc(jsonDocument);
        }
      }
      const data = await response.json().then((data) => ({
        data: data,
        status: response.status,
      }));
      return data;
    } catch (err) {
      console.log(err);
    }
  }
  async getDoc(query: any) {
    const accessToken = localStorage.getItem("vserveAccessToken");
    try {
      const response = await fetch("http://localhost:3001/getData", {
        method: "POST",
        headers: {
          Authorization: "Bearer " + accessToken,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query, database: this.name }),
      });

      if (response.status === 401) {
        console.log("401");
        const authobj = new Auth();
        await authobj.newToken();
        if (localStorage.getItem("vserveAccessToken") !== accessToken) {
          return await this.getDoc(query);
        }
      }
      if (response.status === 403) {
        const authobj = new Auth();
        await authobj.newToken();
        if (localStorage.getItem("vserveAccessToken") !== accessToken) {
          return await this.getDoc(query);
        }
      }
      if (response.status === 400) {
        return { status: 400, data: { message: "Invalid Query" } };
      }
      const data = await response.json().then((data) => ({
        data: data,
        status: response.status,
      }));
      return data;
    } catch (err) {
      console.log(err);
    }
  }
}

export default obj;
