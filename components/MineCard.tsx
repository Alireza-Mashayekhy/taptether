import Image from "next/image";
import BottomSheet from "./BottomSheet";
import { useState } from "react";
import { IoClose } from "react-icons/io5";
import axiosInstance from "@/lib/axiosInstance";
import toast from "react-hot-toast";

interface propsType {
  name: string;
  image: string;
  greenProfit: number;
  goldProfit: number;
  price: number;
  upgradePeriod: number;
  receive: number;
  goldProfitPerHour: number;
  greenProfitPerHour: number;
  interest: number;
  deposit: string;
  description: string;
  isTapper?: boolean;
  is_upgradeable: boolean;
}
export default function MineCard(props: propsType) {
  const [isSheetShow, setSheet] = useState(false);

  const updateCard = async () => {
    if (props.is_upgradeable) {
      try {
        const formData = new FormData();
        formData.append("_id", "233681995");
        formData.append("name", props.name);
        await axiosInstance.post("/profits/", formData);
      } catch (error: any) {
        if (error.response.status === 400) {
          toast.error("profit price is higher than the balance");
        }
      }
    }
  };
  return (
    <>
      <div
        onClick={() => setSheet(true)}
        className={`flex justify-between items-center p-3  rounded-xl ${
          props.is_upgradeable ? "bg-secondary-1" : "bg-[#1ba845] bg-opacity-30"
        }`}
      >
        <div className="flex gap-3">
          <div className="bg-white flex items-center justify-center aspect-square rounded-lg p-2 min-w-9">
            {props.image && (
              <Image
                alt={props.name}
                src={props.image}
                width={25}
                height={25}
              />
            )}
          </div>
          <div className="flex flex-col justify-between">
            <div className="text-sm font-semibold">{props.name}</div>
            <div className="flex items-center gap-1 text-xs">
              <span>Profit</span>
              <Image src="/coin.svg" alt="coin" width={14} height={14} />
              {props.greenProfit}
            </div>
            {props.isTapper && (
              <div className="flex items-center gap-1 text-xs">
                <span>Profit</span>
                <Image
                  src="/secondCoin.png"
                  alt="secondCoin"
                  width={14}
                  height={14}
                />
                {props.goldProfit}
              </div>
            )}
          </div>
        </div>
        {props.is_upgradeable ? (
          <button className="flex items-center gap-1 text-xs border border-primary-1 px-2.5 pb-1 pt-0.5 rounded-md">
            Buy - {props.price}
            <Image src="/coin.svg" alt="coin" width={14} height={14} />
          </button>
        ) : (
          <button className="flex items-center gap-1 text-xs text-white bg-primary-1 px-2.5 pb-1 pt-0.5 rounded-md">
            Details
          </button>
        )}
      </div>
      {isSheetShow && (
        <BottomSheet
          dontHaveClose
          haveGreen
          close={() => {
            setSheet(false);
          }}
        >
          <div className="p-3">
            <div className="bg-secondary-1 rounded-xl flex flex-col items-center gap-4 relative p-3">
              <button
                onClick={(e) => setSheet(false)}
                className="absolute top-3 right-3 border border-secondary-2 rounded-lg p-1"
              >
                <IoClose color="#b0b7b4" />
              </button>
              <div className="bg-white p-4 aspect-[1] flex items-center justify-center rounded-lg">
                {props.image && (
                  <Image
                    alt={props.name}
                    src={props.image}
                    width={33}
                    height={33}
                  />
                )}
              </div>
              <div className="text-3xl font-semibold">{props.name}</div>
              <div className="text-sm text-secondary-2">
                {props.description}
              </div>
            </div>
            <div className="flex flex-col gap-2 mt-7">
              <div className="flex justify-between items-center">
                <div className="text-xs text-secondary-2">Upgrade period:</div>
                <div className="text-sm">{props.upgradePeriod} days</div>
              </div>
              <div className="flex justify-between items-center">
                <div className="text-xs text-secondary-2">You receive</div>
                <div className="text-sm flex items-center gap-1">
                  <Image src="/coin.svg" alt="coin" width={14} height={14} />
                  {props.receive}
                </div>
              </div>
              <div className="flex justify-between items-center">
                <div className="text-xs text-secondary-2">Profit per hour</div>
                <div className="text-sm flex items-center gap-1">
                  +
                  <Image src="/coin.svg" alt="coin" width={14} height={14} />
                  {props.greenProfitPerHour}
                  {props.isTapper && (
                    <div className="text-sm flex items-center gap-1">
                      /
                      <Image
                        src="/secondCoin.png"
                        alt="secondCoin"
                        width={14}
                        height={14}
                      />
                      {props.goldProfitPerHour}
                    </div>
                  )}
                </div>
              </div>
              <div className="flex justify-between items-center">
                <div className="text-xs text-secondary-2">Profit per day</div>
                <div className="text-sm flex items-center gap-1">
                  +
                  <Image src="/coin.svg" alt="coin" width={14} height={14} />
                  {props.greenProfitPerHour * 24}
                  {props.isTapper && (
                    <div className="text-sm flex items-center gap-1">
                      /
                      <Image
                        src="/secondCoin.png"
                        alt="secondCoin"
                        width={14}
                        height={14}
                      />{" "}
                      {props.goldProfitPerHour * 24}
                    </div>
                  )}
                </div>
              </div>
              <div className="flex justify-between items-center">
                <div className="text-xs text-secondary-2">Interest per day</div>
                <div className="text-sm flex items-center gap-1">
                  {props.interest} %
                </div>
              </div>
              <div className="flex justify-between items-center">
                <div className="text-xs text-secondary-2">Deposit</div>
                <div className="text-sm flex items-center gap-1">
                  {props.deposit}
                </div>
              </div>
              <div className="grid grid-cols-2 w-full gap-3">
                <button
                  onClick={updateCard}
                  className="text-sm py-0.5 bg-primary-1 rounded-lg text-white"
                >
                  BUY (8 USDT) Ton
                </button>
                <button
                  onClick={updateCard}
                  className="text-sm py-0.5 bg-primary-1 rounded-lg text-white"
                >
                  BUY (8 USDT) Internal balance
                </button>
              </div>
            </div>
          </div>
        </BottomSheet>
      )}
    </>
  );
}
