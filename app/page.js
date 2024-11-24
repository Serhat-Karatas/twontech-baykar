import { BudgetProvider } from "./context/Context";
import HomeContent from "@/container/Home";
import { cookies } from "next/headers";

export default async function Home() {
  const cookieStore = await cookies();
  const user = cookieStore.get("currentUser");

  return (
    <BudgetProvider userCookie={user?.value}>
      <HomeContent />
    </BudgetProvider>
  );
}
