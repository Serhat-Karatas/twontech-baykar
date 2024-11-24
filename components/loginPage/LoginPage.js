"use client";

import InputSection from "@/components/common/inputSection/InputSection";
import { useState } from "react";
import BlueBtn from "@/components/common/blueBtn/BlueBtn";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import Image from "next/image";
import "react-toastify/dist/ReactToastify.css";
import data from "@/data.json";
import loginimg from "@/public/login.jpg";

const LoginPage = () => {
  const [isLoginSelect, setIsLoginSelect] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordAgain, setPasswordAgain] = useState("");
  const [usersData, setUsersData] = useState(data.users);
  const router = useRouter();
  const loginUser = async () => {
    const user = usersData.find(
      (u) => u.name === email && u.password === password
    );
    if (user) {
      localStorage.setItem(
        "currentUser",
        JSON.stringify({ id: user.id, name: user.name })
      );
      document.cookie = `currentUser=${JSON.stringify({
        id: user.id,
        name: user.name,
      })}; path=/`;
      toast.success("Giriş başarılı!");
      router.push("/");
    } else {
      toast.error("Giriş başarısız! Bilgilerinizi kontrol edin.");
    }
  };

  const registerUser = async () => {
    if (password !== passwordAgain) {
      toast.error("Şifreler uyuşmuyor");
      return;
    }

    const existingUser = usersData.find((u) => u.name === email);
    if (existingUser) {
      toast.error("Bu kullanıcı zaten kayıtlı!");
      return;
    }

    try {
      const response = await fetch("/api/addUser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: email,
          password,
        }),
      });

      if (response.status === 201) {
        const data = await response.json();

        localStorage.setItem(
          "currentUser",
          JSON.stringify({ id: data.id, name: data.name })
        );
        document.cookie = `currentUser=${JSON.stringify({
          id: data.id,
          name: data.name,
        })}; path=/`;

        toast.success("Kayıt başarılı!");
        router.push("/");
      } else {
        const errorData = await response.json();
        toast.error(errorData.message || "Kayıt başarısız!");
      }
    } catch (error) {
      toast.error("Sunucuyla bağlantı kurulamadı!");
      console.error(error);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <ToastContainer />
      <div className="flex flex-col gap-8 md:flex-row md:gap-0 items-center justify-center p-4">
        <div
          className="w-full h-auto max-w-[450px] md:max-h-[570px] p-4 sm:p-12 shadow-xl md:mr-[-30px] border rounded-lg objecy-cover"
          style={{
            background: "hsla(0, 0%, 100%, 0.55)",
            backdropFilter: "blur(10px)",
          }}
        >
          <div className="flex flex-row w-full gap-4 mb-8">
            <button
              className={`w-full rounded-lg ${
                isLoginSelect
                  ? "bg-[#e3ebf7] text-[#285192]"
                  : "bg-[#f7f7f7] text-[#757574]"
              } font-bold cursor-pointer px-5 lg:px-10 py-3 border-[none]`}
              onClick={() => {
                setIsLoginSelect(true);
              }}
            >
              GİRİŞ YAP
            </button>
            <button
              className={`w-full rounded-lg ${
                !isLoginSelect
                  ? "bg-[#e3ebf7] text-[#285192]"
                  : "bg-[#f7f7f7] text-[#757574]"
              } font-bold cursor-pointer px-5 lg:px-10 py-3 border-[none]`}
              onClick={() => {
                setIsLoginSelect(false);
              }}
            >
              KAYIT OL
            </button>
          </div>

          <div className="flex w-full flex-col gap-2">
            <p className="text-xs text-slate-500 px-3">
              Serhat 12345678 ile giriş yapabilirsiniz. Daha ayrıntılı bilgi
              için lütfen readme dosyasını inceleyiniz.
            </p>
            <InputSection
              value={email}
              placeholder="kullanıcı adı"
              inputType="text"
              onChange={(e) => setEmail(e.target.value)}
            />
            <InputSection
              value={password}
              placeholder="Parola"
              inputType="password"
              onChange={(e) => setPassword(e.target.value)}
            />
            {!isLoginSelect && (
              <InputSection
                value={passwordAgain}
                placeholder="Parola Tekrar"
                inputType="password"
                onChange={(e) => setPasswordAgain(e.target.value)}
              />
            )}
          </div>

          <div className="flex flex-col mt-[24px] gap-[24px]">
            <BlueBtn
              text={isLoginSelect ? "GİRİŞ YAP" : "KAYDOL"}
              onClick={isLoginSelect ? loginUser : registerUser}
            />
          </div>
        </div>
        <div className="w-full h-auto md:w-[400px] md:h-[500px] lg:w-[500px] lg:h-[600px] shadow">
          <Image
            src={loginimg}
            alt="login"
            className="w-full h-full border rounded-lg"
            width={400}
            height={500}
            priority
          />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
