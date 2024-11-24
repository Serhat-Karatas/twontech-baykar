"use client";

import React from "react";
import StepperList from "@/components/howItWorksStepper/StepperList";
import { useRouter } from "next/navigation";

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
    {
      text: "Bonus Maddeler",
    },
  ],
};

const Banner = () => {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      const response = await fetch("/api/logout", {
        method: "GET",
      });

      if (response.ok) {
        localStorage.removeItem("currentUser");
        router.push("/login");
      } else {
        console.error("Çıkış işlemi başarısız oldu");
      }
    } catch (error) {
      console.error("Logout işlemi sırasında hata oluştu:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center bg-black w-full h-auto gap-2 pt-12 pb-10 sm:gap-6 text-white">
      <p className="text-xl uppercase px-3">Serhat Karataş</p>
      <h1 className="text-5xl sm:text-7xl font-extrabold max-w-[800px] text-center pb-4 sm:pb-10 -tracking-wide uppercase">
        Bütçe Yönetim Sistemi
      </h1>
      <StepperList data={stepperList} />
      <button
        onClick={handleLogout}
        className="text-red-600 hover:text-red-300 hover:border-red-300 border-2 border-red-600 rounded-lg p-4 mt-0 sm:mt-4"
      >
        Çıkış Yap
      </button>
      <p className="mt-2">Lütfen readme dosyasını okuyunuz.</p>
    </div>
  );
};

export default Banner;
