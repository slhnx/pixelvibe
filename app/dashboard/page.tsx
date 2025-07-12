import NewDesignDialog from "@/components/new-design-dialog";

const Page = () => {
  return (
    <main className="relative">
      <div className="absolute top-10 -translate-y-[20%] z-[-2] h-screen w-screen dark:bg-neutral-950 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]"></div>
      <div className="container mx-auto my-28 text-primary">
        <h1 className="text-7xl text-center">Good Morning, Shaan!</h1>
        <p className="text-secondary-foreground/80 text-xl text-center mt-4">
          Choose from a list of templates below and get started with your design
        </p>
        <div className="flex justify-center mt-12">
          <NewDesignDialog />
        </div>
      </div>
    </main>
  );
};

export default Page;
