import VueJwtDecode from "vue-jwt-decode";

export default {
  async signin(context, payload) {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/auth/signin`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          method: "POST",
          body: JSON.stringify({
            email: payload.email,
            password: payload.password,
          }),
        }
      );

      if (!response.ok) {
        const error = new Error(
          response.message || "Failed to authenticate. Check your login data."
        );
        throw error;
      }

      const responseData = await response.json();

      if (responseData.message == "User profile is not activated !")
        return responseData;
      if (responseData.message == "User does not exist !") return responseData;
      if (responseData.message == "User profile is not activated !")
        return responseData;

      localStorage.setItem("esgi-ws-token", responseData.accessToken);

      const userInfos = VueJwtDecode.decode(responseData.accessToken);
      context.commit("setUser", {
        token: responseData.accessToken,
        refreshToken: responseData.refreshToken,
        firstname: userInfos.firstname,
        lastname: userInfos.lastname,
        email: userInfos.email,
        roles: userInfos.roles,
        userId: userInfos.id,
      });

      return responseData;
    } catch (ex) {
      const error = new Error(
        ex || "Failed to authenticate. Check your login data."
      );
      throw error;
    }
  },
  tryLogin(context) {
    const token = localStorage.getItem("esgi-ws-token");
    if (token) {
      const userInfos = VueJwtDecode.decode(token);
      context.commit("setUser", {
        token: token,
        firstname: userInfos.firstname,
        lastname: userInfos.lastname,
        email: userInfos.email,
        roles: userInfos.roles,
        userId: userInfos.id,
      });
    }
  },
  async signUp(context, payload) {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/auth/signup`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          method: "POST",
          body: JSON.stringify({
            firstname: payload.firstname,
            lastname: payload.lastname,
            email: payload.email,
            adresse: payload.street,
            city: payload.city,
            codeCity: payload.postalCode,
            phoneNumber: payload.phoneNumber,
            password: payload.password,
            age: payload.age,
          }),
        }
      );

      if (!response.ok) {
        const error = new Error(
          response.message || "Failed to register. Check your register data."
        );
        throw error;
      }
      return response;
    } catch (err) {
      const error = new Error(
        err || "Failed to register. Check your register data."
      );
      throw error;
    }
  },

  async sendMessageContact(context, payload) {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/mail/createMessageContact`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          method: "POST",
          body: JSON.stringify({
            email: payload.email,
            firstname: payload.firstname,
            lastname: payload.lastname,
            object: payload.object,
            message: payload.message,
          }),
        }
      );

      if (!response.ok) {
        const error = new Error(
          response.message || "Failed to register. Check your register data."
        );
        throw error;
      }
      return response;
    } catch (err) {
      const error = new Error(
        err || "Failed to register. Check your register data."
      );
      throw error;
    }
  },
  async getContactMessages(context, payload) {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/mail/getAllMessages`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${payload.token}`,
          },
          method: "GET",
        }
      );

      const responseData = await response.json();

      if (!response.ok) {
        const error = new Error("Failed to get messages list!");
        throw error;
      }

      return responseData;
    } catch (err) {
      const error = new Error(err);
      throw error;
    }
  },
  async validateMessage(context, payload) {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/mail/validateMessage`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${payload.token}`,
          },
          method: "PUT",
          body: JSON.stringify({
            _id: payload.id,
          }),
        }
      );

      if (!response.ok) {
        const error = new Error(
          response.message || "Failed to validate. Check your validate data."
        );
        throw error;
      }
      return response;
    } catch (err) {
      const error = new Error(
        err || "Failed to validate. Check your validate data."
      );
      throw error;
    }
  },

  async createCreditCard(context, payload) {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/payment/createCreditCard`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${payload.token}`,
          },
          method: "POST",
          body: JSON.stringify({
            cardNumber: payload.cardNumber,
            expiryDate: payload.expiryDate,
            cvc: payload.cvc,
            cardName: payload.cardName,
            userEmail: payload.userEmail,
          }),
        }
      );

      if (!response.ok) {
        const error = new Error(
          response.message || "Failed to register. Check your credit card data."
        );
        throw error;
      }
      return response;
    } catch (err) {
      const error = new Error(
        err || "Failed to create credit card. Check your data."
      );
      throw error;
    }
  },
  async getCreditCard(context, payload) {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/payment/findCreditCard/${
          payload.email
        }`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${payload.token}`,
          },
          method: "GET",
        }
      );

      const responseData = await response.json();

      if (!response.ok) {
        const error = new Error("Failed to get card!");
        throw error;
      }

      return responseData;
    } catch (err) {
      const error = new Error(err);
      throw error;
    }
  },
  async deleteCreditCard(context, payload) {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/payment/deleteCreditCard/${
          payload.email
        }`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${payload.token}`,
          },
          method: "DELETE",
        }
      );

      const responseData = await response.json();

      if (!response.ok) {
        const error = new Error("Failed to delete card!");
        throw error;
      }

      return responseData;
    } catch (err) {
      const error = new Error(err);
      throw error;
    }
  },
};
