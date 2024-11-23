import { BudgetProvider } from "./context/Context";
import { cookies } from "next/headers";
import Income from "@/components/income/Income";
import Banner from "@/components/banner/Banner";
import Category from "@/components/category/Category";
import Expanse from "@/components/expense/Expense";
import Analysis from "@/components/analysis/Analysis";

export default async function Home() {
  const cookieStore = await cookies();
  const user = cookieStore.get("currentUser");
  return (
    <BudgetProvider userCookie={user?.value}>
      <main className="flex flex-col items-center gap-28">
        <Banner />
        <Income />
        <Category />
        <Expanse />
        <Analysis />
        <div></div>
      </main>
    </BudgetProvider>
  );
}
