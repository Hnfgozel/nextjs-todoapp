"use client";
import { signIn, ClientSafeProvider, getProviders } from "next-auth/react";
import { useEffect, useState } from "react";

const LoginPage = () => {
  const [providers, setProviders] = useState<ClientSafeProvider[] | null>(null);

  useEffect(() => {
    (async () => {
      const res = await getProviders();
      if (res) {
        const providersArray = Object.values(res) as ClientSafeProvider[];
        setProviders(providersArray);
      }
    })();
  }, []);

  return (
    <section className="w-full flex-center flex-col">
      <h1 className="head_text text-center">
        Playable Factory Test Case
        <br className="max-md:hidden" />
        <span className="orange_gradient text_center"> Login Page</span>
      </h1>
      <p className="desc text_center">
        Bu uygulamada bir login ve feeds sayfası bulunmaktadır. Aşağıdan giriş
        yaptıktan sonra kullanıcı tarafını görebileceksiniz. Anlık olarak Google
        ile giriş yapılmaktadır.
      </p>

      {providers &&
        Object.values(providers).map((provider) => (
          <button
            type="button"
            key={provider.name}
            onClick={() => {
              signIn(provider.id);
            }}
            className="black_btn"
          >
            Sign in with Google
          </button>
        ))}
    </section>
  );
};

export default LoginPage;
