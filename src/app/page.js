"use client";
import Footer from "@/components/Footer";
import FormData from "@/components/FormData";

const Home = () => {
  return (
    <div className="flex flex-col justify-center items-center gap-5 w-full">
      <FormData />
      <Footer name="Mahadi Saputra" />
    </div>
  );
};

export default Home;
