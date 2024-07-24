import Image from 'next/image';
import { AiFillThunderbolt } from 'react-icons/ai';
import { FaRegUser } from 'react-icons/fa6';

export default function Home() {
    return (
        <div className="flex flex-col gap-5">
            <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                    <FaRegUser className="w-6 h-6" />
                    <div className="text-sm">Alireza</div>
                </div>
                <div className="rounded-full px-4 py-1 pb-2 text-sm text-primary-1 bg-primary-1 bg-opacity-[10%]">
                    Deposit / Withdraw
                </div>
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
                        <div>+0</div>
                    </div>
                    <div className="flex items-center gap-1">
                        <Image
                            src="/secondCoin.png"
                            alt="profitTapCoin"
                            width={25}
                            height={25}
                        />
                        <div>+0</div>
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
                        <div>+0</div>
                    </div>
                    <div className="flex items-center gap-1">
                        <Image
                            src="/secondCoin.png"
                            alt="profitHourCoin"
                            width={25}
                            height={25}
                        />
                        <div>+0</div>
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
                <div className=" text-3xl text-center">0.000000</div>
            </div>
            <div className="flex items-center justify-center gap-2">
                <Image
                    src="/secondCoin.png"
                    alt="profitHourCoin"
                    width={40}
                    height={40}
                />
                <div className="text-xl text-center">0.000000</div>
            </div>
            <div className="flex justify-center items-center pb-20">
                <div className="relative w-2/3 max-w-80">
                    <Image
                        src="/tapCoin.png"
                        alt="token"
                        width={500}
                        height={500}
                        className="w-full aspect-square rounded-full"
                    />
                    <span
                        className="w-[110%] h-[110%] absolute -left-[5%] -top-[5%] bg-blue-50 shadow-blue-200 rounded-full -z-[1]"
                        style={{ boxShadow: '0px 0px 20px 0px #bfdbfe' }}
                    />
                    <span
                        className="w-[130%] h-[130%] absolute -left-[15%] -top-[15%] bg-blue-50 shadow-blue-200 rounded-full -z-[2]"
                        style={{ boxShadow: '0px 0px 20px 0px #bfdbfe' }}
                    />
                    <span
                        className="w-[150%] h-[150%] absolute -left-[25%] -top-[25%] bg-blue-50 shadow-blue-200 rounded-full -z-[3]"
                        style={{ boxShadow: '0px 0px 20px 0px #bfdbfe' }}
                    />
                </div>
            </div>
            <div className="flex items-center gap-2 fixed bottom-24">
                <AiFillThunderbolt color="#26a17b" />
                1000 / 1000
            </div>
        </div>
    );
}
