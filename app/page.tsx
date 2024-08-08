"use client";
import Image from "next/image";
import { useRef, useState } from "react";
import { AiFillThunderbolt } from "react-icons/ai";
import { FaRegUser } from "react-icons/fa6";
import "./coinTap.css";
import BottomSheet from "@/components/BottomSheet";
import Withdraw from "@/components/Withdraw";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import axiosInstance from "@/lib/axiosInstance";
import axios from "axios";

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Home />
    </QueryClientProvider>
  );
}

function Home() {
  const [energy, setEnergy] = useState(1000);
  const [count, setCount] = useState(0);
  const [count2, setCount2] = useState(0);
  const [profitPerClick, setProfitPerClick] = useState(0);
  const [profitPerHour, setProfitPerHour] = useState(0);
  const [profitPerClick2, setProfitPerClick2] = useState(0.000037);
  const [profitPerHour2, setProfitPerHour2] = useState(0);
  const [isSheetOpen, setSheet] = useState(false);

  const coinRef = useRef<HTMLInputElement>(null);
  const coinImage = useRef<HTMLImageElement>(null);

  async function fetchTodos() {
    const response = await axiosInstance.get("/users");
    return response.data;
  }

  const { isPending, error, data } = useQuery({
    queryKey: ["repoData"],
    queryFn: () => fetchTodos(),
  });

  const coinTaped = (e: any) => {
    if (energy) {
      if (e.clientX < window.innerWidth / 2 && coinImage.current) {
        coinImage.current.style.transform = "rotateY(20deg)";
        setTimeout(() => {
          if (coinImage.current)
            coinImage.current.style.transform = "rotateY(0deg)";
        }, 100);
      } else if (coinImage.current) {
        coinImage.current.style.transform = "rotateY(-20deg)";
        setTimeout(() => {
          if (coinImage.current)
            coinImage.current.style.transform = "rotateY(0deg)";
        }, 100);
      }
      setEnergy(energy - 1);
      setCount(count + profitPerClick);
      setCount2(count2 + profitPerClick2);
      const newNumber = document.createElement("div");
      const newNumber2 = document.createElement("div");
      newNumber.classList.add("number2");
      newNumber.innerText = profitPerClick.toString();
      newNumber2.classList.add("number");
      newNumber2.innerText = profitPerClick2.toString();
      newNumber.style.top = `${
        e.clientY - (coinRef.current?.offsetTop || 0) - 100
      }px`;
      newNumber.style.left = `${
        e.clientX - (coinRef.current?.offsetLeft || 0)
      }px`;
      newNumber2.style.top = `${
        e.clientY - (coinRef.current?.offsetTop || 0) - 100
      }px`;
      newNumber2.style.left = `${
        e.clientX - (coinRef.current?.offsetLeft || 0)
      }px`;

      coinRef.current?.appendChild(newNumber);
      coinRef.current?.appendChild(newNumber2);

      setTimeout(() => {
        newNumber.classList.add("animate");
        newNumber2.classList.add("animate");
      }, 10);

      newNumber.addEventListener("transitionend", () => {
        newNumber.remove();
      });
      newNumber2.addEventListener("transitionend", () => {
        newNumber2.remove();
      });
    }
  };

  if (isPending) return "Loading...";
  if (error) return "An error has occurred: " + error.message;

  return (
    <div className="bg-secondary-1 pt-16">
      <div className="rounded-t-3xl bg-primary-1 relative pt-1">
        <div className="py-8 px-3 bg-white rounded-t-3xl flex flex-col gap-5">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <FaRegUser className="w-6 h-6" />
              <div className="text-sm">Alireza</div>
            </div>
            <button
              onClick={() => setSheet(true)}
              className="rounded-full px-4 py-1 pb-2 text-sm text-primary-1 bg-primary-1 bg-opacity-[10%]"
            >
              Deposit / Withdraw
            </button>
          </div>
          <div className="grid grid-cols-2 gap-5 text-sm">
            <div className="bg-secondary-1 flex flex-col items-center gap-1 p-1 rounded-md pb-2">
              <div className="text-amber-400">Profit per click</div>
              <div className="flex items-center gap-1">
                <Image
                  src="/coin.svg"
                  alt="profitTapCoin"
                  width={20}
                  height={20}
                />
                <div>+{profitPerClick}</div>
              </div>
              <div className="flex items-center gap-1">
                <Image
                  src="/secondCoin.png"
                  alt="profitTapCoin"
                  width={25}
                  height={25}
                />
                <div>+{profitPerClick2}</div>
              </div>
            </div>
            <div className="bg-secondary-1 flex flex-col items-center gap-1 p-1 rounded-md pb-2">
              <div className="text-amber-400">Profit per hour</div>
              <div className="flex items-center gap-1">
                <Image
                  src="/coin.svg"
                  alt="profitHourCoin"
                  width={20}
                  height={20}
                />
                <div>+{profitPerHour}</div>
              </div>
              <div className="flex items-center gap-1">
                <Image
                  src="/secondCoin.png"
                  alt="profitHourCoin"
                  width={25}
                  height={25}
                />
                <div>+{profitPerHour2}</div>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center gap-4">
            <Image
              src="/coin.svg"
              alt="profitHourCoin"
              width={60}
              height={60}
            />
            <div className=" text-3xl text-center">{count.toFixed(6)}</div>
          </div>
          <div className="flex items-center justify-center gap-2 z-10">
            <Image
              src="/secondCoin.png"
              alt="profitHourCoin"
              width={40}
              height={40}
            />
            <div className="text-xl text-center">{count2.toFixed(6)}</div>
          </div>
          <div className="flex justify-center items-center pb-20">
            <div className="relative w-2/3 max-w-80" ref={coinRef}>
              <Image
                src="/tapCoin.png"
                alt="token"
                width={500}
                height={500}
                ref={coinImage}
                className="w-full aspect-square rounded-full relative z-[10] transition duration-[100ms]"
                onClick={coinTaped}
              />
              <span
                className="w-[110%] h-[110%] absolute -left-[5%] -top-[5%] bg-blue-50 shadow-blue-200 rounded-full z-[1]"
                style={{
                  boxShadow: "0px 0px 20px 0px #bfdbfe",
                }}
              />
              <span
                className="w-[130%] h-[130%] absolute -left-[15%] -top-[15%] bg-blue-50 shadow-blue-200 rounded-full z-[2]"
                style={{
                  boxShadow: "0px 0px 20px 0px #bfdbfe",
                }}
              />
              <span
                className="w-[150%] h-[150%] absolute -left-[25%] -top-[25%] bg-blue-50 shadow-blue-200 rounded-full z-[3]"
                style={{
                  boxShadow: "0px 0px 20px 0px #bfdbfe",
                }}
              />
            </div>
          </div>
          <div className="flex items-center gap-2 fixed bottom-24 z-20">
            <AiFillThunderbolt color="#26a17b" />
            {energy} / 1000
          </div>
        </div>
      </div>
      {isSheetOpen && (
        <BottomSheet close={() => setSheet(false)}>
          <Withdraw />
        </BottomSheet>
      )}
    </div>
  );
}
