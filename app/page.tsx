"use client";

import { useSession } from "next-auth/react";
import TodosPage from "./todos/page";
import LoginPage from "./login/page";

const Home = () => {
  const { data: session } = useSession();

  return (
    <section className="w-full flex-center flex-col">
      {session ? <TodosPage /> : <LoginPage />}
    </section>
  );
};

export default Home;
