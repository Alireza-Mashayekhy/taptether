import Image from "next/image";
import { FaRegUser } from "react-icons/fa6";

export default function Home() {
  return (
    <div className="flex flex-col gap-5">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <FaRegUser className="w-6 h-6" />
          <div className="text-sm">Alireza</div>
        </div>
        <div className="rounded-full px-4 py-1 pb-2 text-sm text-green-700 bg-green-200">
          Deposit / Withdraw
        </div>
      </div>
      <div className="grid grid-cols-2 gap-5 text-sm">
        <div className="bg-gray-100 flex flex-col items-center gap-1 p-1 rounded-md pb-2">
          <div className="text-amber-400">Profit per click</div>
          <div>+0</div>
          <div>+0</div>
        </div>
        <div className="bg-gray-100 flex flex-col items-center gap-1 p-1 rounded-md pb-2">
          <div className="text-amber-400">Profit per hour</div>
          <div>+0</div>
          <div>+0</div>
        </div>
      </div>
      <div className="font-bold text-3xl text-center">0.000000</div>
      <div className="text-xl text-center">0.000000</div>
      <div className="flex justify-center items-center">
        <div className="relative w-2/3">
          <Image
            src="/next.svg"
            alt="token"
            width={500}
            height={500}
            className="w-full aspect-square bg-gray-200 rounded-full"
          />
          <span
            className="w-[120%] h-[120%] absolute -left-[10%] -top-[10%] bg-blue-50 shadow-blue-200 rounded-full -z-[1]"
            style={{ boxShadow: "0px 0px 20px 0px #bfdbfe" }}
          />
          <span
            className="w-[140%] h-[140%] absolute -left-[20%] -top-[20%] bg-blue-50 shadow-blue-200 rounded-full -z-[2]"
            style={{ boxShadow: "0px 0px 20px 0px #bfdbfe" }}
          />
          <span
            className="w-[160%] h-[160%] absolute -left-[30%] -top-[30%] bg-blue-50 shadow-blue-200 rounded-full -z-[3]"
            style={{ boxShadow: "0px 0px 20px 0px #bfdbfe" }}
          />
        </div>
      </div>
    </div>
  );
}
