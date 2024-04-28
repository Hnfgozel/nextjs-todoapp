import Feed from "@/components/Feed";

const TodosPage = () => {
  return (
    <section className="w-full flex-center flex-col">
      <h1 className="head_text text-center">
        Playable Factory Test Case
        <br className="max-md:hidden" />
        <span className="orange_gradient text_center"> Todos Page</span>
      </h1>
      <Feed />
    </section>
  );
};

export default TodosPage;
