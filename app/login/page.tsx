"use client";
import { signIn, getProviders } from "next-auth/react";
import { useState, useEffect } from "react";
import axios from "axios";
import { Input, Button, Typography, Space, notification, message } from "antd";

const { Title, Text } = Typography;

const LoginPage = () => {
  const [providers, setProviders] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);

  useEffect(() => {
    (async () => {
      const res = await getProviders();
      if (res) {
        const providersArray = Object.values(res);
        setProviders(providersArray);
      }
    })();
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });
      if (res?.error) {
        notification.error({
          message: "Login Failed",
          description: res.error,
        });
      } else {
        message.success("Login successful!");
      }
    } catch (error) {
      console.error("Login error:", error);
      notification.error({
        message: "Login Error",
        description: error.message,
      });
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/api/auth/signup", {
        email,
        password,
        username,
      });
      message.success("Registration successful. Please log in.");
      setIsRegistering(false);
    } catch (error) {
      console.error("Registration error:", error);
      notification.error({
        message: "Registration Failed",
        description: error.response?.data?.message || error.message,
      });
    }
  };


  return (
    <section className="flex items-center justify-center p-6 overflow-hidden">
      <div className="w-full max-w-md">
        <Title level={2} className="text-center mb-4">
          Playable Factory Test Case
        </Title>
        <Title level={4} className="text-center mb-8" style={{ color: "#ff6600" }}>
          {isRegistering ? "Register" : "Login"} Page
        </Title>
        <Text className="text-center block mb-6 text-gray-600">
          Bu uygulamada bir login ve feeds sayfası bulunmaktadır. Aşağıdan giriş yaptıktan sonra kullanıcı tarafını görebileceksiniz.
        </Text>

        <form onSubmit={isRegistering ? handleRegister : handleLogin} className="flex flex-col space-y-4">
          {isRegistering && (
            <Input
              size="large"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          )}
          <Input
            size="large"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Input.Password
            size="large"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Button htmlType="submit" size="large" className="w-full" style={{ backgroundColor: "#ff6600", color: "#fff", borderColor: "#ff6600" }}>
            {isRegistering ? "Register" : "Login"}
          </Button>
          <Button type="link" onClick={() => setIsRegistering(!isRegistering)} className="text-center" style={{ color: "#ff6600" }}>
            {isRegistering ? "Already have an account? Log in" : "Don't have an account? Register"}
          </Button>
        </form>

        {providers &&
          Object.values(providers)
            .filter((provider) => provider.name !== "Credentials")
            .map((provider) => (
              <Button
                key={provider.name}
                onClick={() => {
                  signIn(provider.id);
                }}
                type="default"
                size="large"
                className="w-full mt-6"
                style={{ borderColor: "#000", color: "#000" }}
              >
                Sign in with {provider.name}
              </Button>
            ))}
      </div>
    </section>
  );
};

export default LoginPage;
