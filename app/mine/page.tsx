'use client';
import MineCard from '@/components/MineCard';
import Image from 'next/image';
import { useState } from 'react';

export default function Mine() {
    const [count, setCount] = useState(0);
    const [count2, setCount2] = useState(0);
    const [profitPerClick, setProfitPerClick] = useState(0.000037);
    const [profitPerHour, setProfitPerHour] = useState(0);
    const [profitPerClick2, setProfitPerClick2] = useState(0);
    const [profitPerHour2, setProfitPerHour2] = useState(0);
    const [selectedCategory, setCategory] = useState(0);
    return (
        <div className="bg-secondary-1 pt-16">
            <div className="rounded-t-3xl bg-primary-1 relative pt-1">
                <div className="py-8 px-3 flex flex-col gap-5 bg-white rounded-t-3xl">
                    <div className="grid grid-cols-2 gap-5 text-sm">
                        <div className="bg-secondary-1 flex flex-col items-center gap-1 p-1 rounded-md pb-2">
                            <div className="text-amber-400">
                                Profit per click
                            </div>
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
                            <div className="text-amber-400">
                                Profit per hour
                            </div>
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
                        <div className=" text-3xl text-center">
                            {count.toFixed(6)}
                        </div>
                    </div>
                    <div className="flex items-center justify-center gap-2">
                        <Image
                            src="/secondCoin.png"
                            alt="profitHourCoin"
                            width={40}
                            height={40}
                        />
                        <div className="text-xl text-center">
                            {count2.toFixed(6)}
                        </div>
                    </div>
                    <div className="text-xs font-semibold">Upgrade profit</div>
                    <div className="grid grid-cols-2 bg-secondary-1 p-2 rounded-lg">
                        <button
                            onClick={() => setCategory(0)}
                            className={`text-center text-xs py-2 font-semibold transition-all rounded-md ${
                                selectedCategory === 0
                                    ? 'bg-primary-1 text-white'
                                    : 'text-secondary-2'
                            }`}
                        >
                            Holders
                        </button>
                        <button
                            onClick={() => setCategory(1)}
                            className={`text-center text-xs py-2 font-semibold transition-all rounded-md ${
                                selectedCategory === 1
                                    ? 'bg-primary-1 text-white'
                                    : 'text-secondary-2'
                            }`}
                        >
                            Tappers
                        </button>
                    </div>
                    <div className="p-2 rounded-lg bg-secondary-1 text-xs">
                        These plans allow you to earn hourly profits only in
                        USDT: you will receive a 78% return and your deposit
                        back after 15 days.
                    </div>
                    <div className="flex flex-col gap-1">
                        {[...new Array(10)].map((item) => {
                            return (
                                <MineCard
                                    key={`card-${item}`}
                                    name="Gas Fee Master"
                                    image="/next.svg"
                                    profit={17.8}
                                    price={8}
                                    upgradePeriod="15 days"
                                    receive={17.8}
                                    profitPerHour={0.022}
                                    profitPerDay={0.52}
                                    interest={5.2}
                                    deposit="Refundable"
                                    description="Upgrade for those lucky with GWEI prices."
                                />
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}
