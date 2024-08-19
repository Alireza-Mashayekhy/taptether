'use client';
import MineCard from '@/components/MineCard';
import axiosInstance from '@/lib/axiosInstance';
import {
    QueryClient,
    QueryClientProvider,
    useQuery,
} from '@tanstack/react-query';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { Suspense, useEffect, useState } from 'react';

const queryClient = new QueryClient();

export default function App() {
    return (
        <Suspense>
            <QueryClientProvider client={queryClient}>
                <Mine />
            </QueryClientProvider>
        </Suspense>
    );
}

function Mine() {
    const [green, setGreen] = useState(0);
    const [gold, setGold] = useState(0);
    const [greenProfitPerClick, setGreenProfitPerClick] = useState(0.000037);
    const [greenProfitPerHour, setGreenProfitPerHour] = useState(0);
    const [goldProfitPerClick, setGoldProfitPerClick] = useState(0);
    const [goldProfitPerHour, setGoldProfitPerHour] = useState(0);
    const [selectedCategory, setCategory] = useState(0);
    const searchParams = useSearchParams();

    async function fetchRefferrals() {
        const response = await axiosInstance.get('/profits');
        return response.data;
    }

    const { isPending, error, data } = useQuery({
        queryKey: ['repoData'],
        queryFn: () => fetchRefferrals(),
    });

    async function fetchUser() {
        const response = await axiosInstance.get('/users', {
            params: {
                _id: searchParams.get('user'),
                token: searchParams.get('token'),
            },
        });
        return response.data;
    }

    const { isPending: userPending, data: userData } = useQuery({
        queryKey: ['userData'],
        queryFn: () => fetchUser(),
    });

    useEffect(() => {
        setGreen(userData?.green_balance || 0);
        setGold(userData?.gold_balance || 0);
        setGreenProfitPerHour(userData?.green_profit_per_hour || 0);
        setGreenProfitPerClick(userData?.green_profit_per_click || 0);
        setGoldProfitPerHour(userData?.gold_profit_per_hour || 0);
        setGoldProfitPerClick(userData?.gold_profit_per_click || 0);
    }, [userPending]);

    interface profitType {
        name: string;
        price: number;
        green_profit_per_click: number;
        green_profit_per_hour: number;
        gold_profit_per_click: number;
        gold_profit_per_hour: number;
        field: string;
        photo: string;
        receive: number;
        deposit: string;
        interest_per_day: number;
        is_upgradeable: boolean;
        upgrade_period: number;
    }

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
                                <div>+{greenProfitPerClick}</div>
                            </div>
                            <div className="flex items-center gap-1">
                                <Image
                                    src="/secondCoin.png"
                                    alt="profitTapCoin"
                                    width={25}
                                    height={25}
                                />
                                <div>+{goldProfitPerClick}</div>
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
                                <div>+{greenProfitPerHour}</div>
                            </div>
                            <div className="flex items-center gap-1">
                                <Image
                                    src="/secondCoin.png"
                                    alt="profitHourCoin"
                                    width={25}
                                    height={25}
                                />
                                <div>+{goldProfitPerHour}</div>
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
                            {green.toFixed(6)}
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
                            {gold.toFixed(6)}
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
                    {selectedCategory === 1 && !isPending && !error && (
                        <div className="flex flex-col gap-1 pb-20">
                            {data
                                .filter(
                                    (tapper: profitType) =>
                                        tapper.field === 'Tappers'
                                )
                                .map((item: profitType) => {
                                    return (
                                        <MineCard
                                            key={`card-${item.name}`}
                                            name={item.name}
                                            image={item.photo}
                                            goldProfit={
                                                item.gold_profit_per_click
                                            }
                                            greenProfit={
                                                item.green_profit_per_click
                                            }
                                            price={item.price}
                                            upgradePeriod={item.upgrade_period}
                                            receive={item.receive}
                                            goldProfitPerHour={
                                                item.gold_profit_per_hour
                                            }
                                            greenProfitPerHour={
                                                item.green_profit_per_hour
                                            }
                                            interest={item.interest_per_day}
                                            deposit={item.deposit}
                                            is_upgradeable={item.is_upgradeable}
                                            description="Upgrade for those lucky with GWEI prices."
                                            isTapper
                                        />
                                    );
                                })}
                        </div>
                    )}
                    {selectedCategory === 0 && !isPending && !error && (
                        <div className="flex flex-col gap-1 pb-20">
                            {data
                                .filter(
                                    (tapper: profitType) =>
                                        tapper.field === 'Holders'
                                )
                                .map((item: profitType) => {
                                    return (
                                        <MineCard
                                            key={`card-${item.name}`}
                                            name={item.name}
                                            image={item.photo}
                                            goldProfit={
                                                item.gold_profit_per_click
                                            }
                                            greenProfit={
                                                item.green_profit_per_click
                                            }
                                            price={item.price}
                                            upgradePeriod={item.upgrade_period}
                                            receive={item.receive}
                                            goldProfitPerHour={
                                                item.gold_profit_per_hour
                                            }
                                            greenProfitPerHour={
                                                item.green_profit_per_hour
                                            }
                                            interest={item.interest_per_day}
                                            deposit={item.deposit}
                                            is_upgradeable={item.is_upgradeable}
                                            description="Upgrade for those lucky with GWEI prices."
                                        />
                                    );
                                })}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
