// src/features/auth/authThunks.js
import axiosInstance from "../../api/axiosInstance";
import { loginStart, loginSuccess, loginFailure, logout } from "./authSlice";

// Fake JWT generator — in real apps your backend sends this
const generateFakeToken = (user) => {
  const payload = btoa(
    JSON.stringify({ id: user.id, role: user.role, email: user.email }),
  );
  return `fakeheader.${payload}.fakesignature`;
};

export const loginUser = (credentials) => async (dispatch) => {
  dispatch(loginStart());
  try {
    // Fetch auth users from JSON Server
    const { data } = await axiosInstance.get("/auth");

    // Find matching user
    const match = data.find(
      (u) =>
        u.email === credentials.email && u.password === credentials.password,
    );

    if (!match) {
      dispatch(loginFailure("Invalid email or password"));
      return { success: false };
    }

    const token = generateFakeToken(match);
    const user = {
      id: match.id,
      name: match.name,
      email: match.email,
      role: match.role,
    };

    dispatch(loginSuccess({ user, token }));
    return { success: true, role: match.role };
  } catch (err) {
    dispatch(loginFailure(err.message || "Login failed"));
    return { success: false };
  }
};

export const signupUser = (userData) => async (dispatch) => {
  dispatch(loginStart());
  try {
    // Check if email already exists
    const { data: existing } = await axiosInstance.get("/auth");
    const emailTaken = existing.find((u) => u.email === userData.email);

    if (emailTaken) {
      dispatch(loginFailure("Email already registered"));
      return { success: false };
    }

    // Save to auth table
    const newAuthUser = {
      email: userData.email,
      password: userData.password,
      role: "user",
      name: userData.name,
    };
    const { data: createdAuth } = await axiosInstance.post(
      "/auth",
      newAuthUser,
    );

    // Save to users table
    await axiosInstance.post("/users", {
      name: userData.name,
      email: userData.email,
      role: "user",
      status: "active",
      avatar: `https://api.dicebear.com/7.x/initials/svg?seed=${userData.name}`,
      createdAt: new Date().toISOString().split("T")[0],
    });

    const token = generateFakeToken(createdAuth);
    const user = {
      id: createdAuth.id,
      name: createdAuth.name,
      email: createdAuth.email,
      role: createdAuth.role,
    };

    dispatch(loginSuccess({ user, token }));
    return { success: true };
  } catch (err) {
    dispatch(loginFailure(err.message || "Signup failed"));
    return { success: false };
  }
};

export const logoutUser = () => (dispatch) => {
  dispatch(logout());
};
