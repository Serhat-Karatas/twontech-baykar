import Income from "@/components/income/Income";
import Banner from "@/components/banner/Banner";
import Category from "@/components/category/Category";
import Expanse from "@/components/expense/Expense";

export default function Home() {
  return (
    <main className="flex flex-col items-center gap-20">
      <Banner />
      <Income />
      <Category />
      <Expanse />
      <div></div>
    </main>
  );
}
