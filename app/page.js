import StepperList from "@/components/howItWorksStepper/StepperList";
const stepperList = {
  title: "Site Haritası",
  stepper: [
    {
      text: "Gelir Ekleme",
    },
    {
      text: "Kategori ve Bütçe Yönetimi",
    },
    {
      text: "Gider Ekleme",
    },
    {
      text: "Raporlama ve Analiz",
    },
  ],
};

export default function Home() {
  return (
    <main className="">
      <div className="flex flex-col items-center justify-center bg-black w-full h-[90vh] gap-6 text-white">
        <p className="text-xl uppercase">Serhat Karataş</p>
        <h1 className="text-6xl sm:text-7xl font-extrabold max-w-[800px] text-center pb-10 -tracking-wide uppercase">
          Bütçe Yönetim Sistemi
        </h1>
        <StepperList data={stepperList} />
      </div>
    </main>
  );
}
