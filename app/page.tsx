'use client';
import Image from 'next/image';
import { Suspense, useEffect, useRef, useState } from 'react';
import { AiFillThunderbolt } from 'react-icons/ai';
import { FaRegUser } from 'react-icons/fa6';
import './coinTap.css';
import BottomSheet from '@/components/BottomSheet';
import Withdraw from '@/components/Withdraw';
import {
    QueryClient,
    QueryClientProvider,
    useQuery,
} from '@tanstack/react-query';
import axiosInstance from '@/lib/axiosInstance';
import { useDebounce } from 'use-debounce';
import { useSearchParams } from 'next/navigation';
import Script from 'next/script';

const queryClient = new QueryClient();

export default function App() {
    return (
        <Suspense>
            <QueryClientProvider client={queryClient}>
                <Home />
            </QueryClientProvider>
        </Suspense>
    );
}

function Home() {
    const [energy, setEnergy] = useState(0);
    const [green, setGreen] = useState(0);
    const [greenDebounce] = useDebounce(green, 1000);
    const [gold, setGold] = useState(0);
    const [goldDebounce] = useDebounce(gold, 1000);
    const [greenProfitPerClick, setGreenProfitPerClick] = useState(0);
    const [greenProfitPerHour, setGreenProfitPerHour] = useState(0);
    const [goldProfitPerClick, setGoldProfitPerClick] = useState(0.000037);
    const [goldProfitPerHour, setGoldProfitPerHour] = useState(0);
    const [isSheetOpen, setSheet] = useState(false);
    const [startTap, setStartTap] = useState(new Date());
    const searchParams = useSearchParams();
    const coinRef = useRef<HTMLInputElement>(null);
    const coinImage = useRef<HTMLImageElement>(null);
    const [firstGoldValue, setFirstGoldValue] = useState(0);
    const [firstGreenValue, setFirstGreenValue] = useState(0);

    async function fetchUser() {
        const response = await axiosInstance.get('/users', {
            params: {
                _id: searchParams.get('user'),
                token: searchParams.get('token'),
            },
        });
        return response.data;
    }

    const { isPending, error, data } = useQuery({
        queryKey: ['userData'],
        queryFn: () => fetchUser(),
    });

    useEffect(() => {
        setEnergy(data?.energy || 0);
        setGreen(data?.green_balance || 0);
        setGold(data?.gold_balance || 0);
        setGreenProfitPerHour(data?.green_profit_per_hour || 0);
        setGreenProfitPerClick(data?.green_profit_per_click || 0);
        setGoldProfitPerHour(data?.gold_profit_per_hour || 0);
        setGoldProfitPerClick(data?.gold_profit_per_click || 0);
    }, [isPending]);

    async function updateUserData() {
        const startTime =
            Date.parse(new Date().toString()) - Date.parse(startTap.toString());
        let click_count = 0;
        if (greenProfitPerClick > 0) {
            click_count = Math.ceil(
                (green - firstGreenValue) / greenProfitPerClick
            );
        } else if (goldProfitPerClick > 0) {
            click_count = Math.ceil(
                (gold - firstGoldValue) / goldProfitPerClick
            );
        }
        const formData = new FormData();
        formData.append('_id', searchParams.get('user') || '');
        formData.append('token', searchParams.get('token') || '');
        formData.append('energy', energy.toString());
        formData.append('gold_balance', gold.toString());
        formData.append('green_balance', green.toString());
        formData.append('start_time', startTime.toString());
        formData.append('click_count', click_count.toString());
        await axiosInstance.put('/users/', formData);
    }

    useEffect(() => {
        if (
            data &&
            (greenDebounce !== data?.green_balance ||
                goldDebounce !== data?.gold_balance)
        ) {
            updateUserData();
        }
    }, [greenDebounce, goldDebounce]);

    const energyInterval = () => {
        setEnergy((counter) => (counter < 1000 ? counter + 1 : 1000));
    };
    useEffect(() => {
        const timerId = setInterval(() => {
            energyInterval();
        }, 1000);

        return () => clearInterval(timerId);
    }, []);

    const coinTaped = (e: any) => {
        if (
            energy >= 1 &&
            (greenProfitPerClick > 0 || goldProfitPerClick > 0)
        ) {
            if (green == greenDebounce || gold == goldDebounce) {
                setStartTap(new Date());
                setFirstGoldValue(gold);
                setFirstGreenValue(green);
            }
            if (e.clientX < window.innerWidth / 2 && coinImage.current) {
                coinImage.current.style.transform = 'rotateY(20deg)';
                setTimeout(() => {
                    if (coinImage.current)
                        coinImage.current.style.transform = 'rotateY(0deg)';
                }, 100);
            } else if (coinImage.current) {
                coinImage.current.style.transform = 'rotateY(-20deg)';
                setTimeout(() => {
                    if (coinImage.current)
                        coinImage.current.style.transform = 'rotateY(0deg)';
                }, 100);
            }
            setEnergy(energy - 1);
            setGreen(green + greenProfitPerClick);
            setGold(gold + goldProfitPerClick);
            const newNumber = document.createElement('div');
            const newNumber2 = document.createElement('div');
            newNumber.classList.add('number2');
            newNumber.innerText = greenProfitPerClick.toString();
            newNumber2.classList.add('number');
            newNumber2.innerText = goldProfitPerClick.toString();
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
                newNumber.classList.add('animate');
                newNumber2.classList.add('animate');
            }, 10);

            newNumber.addEventListener('transitionend', () => {
                newNumber.remove();
            });
            newNumber2.addEventListener('transitionend', () => {
                newNumber2.remove();
            });
        }
    };
    if (typeof window !== 'undefined') {
        useEffect(() => {
            const app = (window as any).Telegram?.WebApp;
            if (app) {
                app.ready();
            }
        }, []);
    }
    return (
        <>
            <Script src="https://telegram.org/js/telegram-web-app.js" />
            <div className="bg-secondary-1 pt-16 h-screen">
                <div className="rounded-t-3xl bg-primary-1 relative pt-1 h-screen">
                    <div className="py-8 px-3 bg-white rounded-t-3xl flex flex-col gap-5 h-screen">
                        <div className="flex justify-between items-center">
                            <div className="flex items-center gap-3">
                                <FaRegUser className="w-6 h-6" />
                                <div className="text-sm">{data?.user_name}</div>
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
                                {green?.toFixed(6)}
                            </div>
                        </div>
                        <div className="flex items-center justify-center gap-2 z-10">
                            <Image
                                src="/secondCoin.png"
                                alt="profitHourCoin"
                                width={40}
                                height={40}
                            />
                            <div className="text-xl text-center">
                                {gold?.toFixed(6)}
                            </div>
                        </div>
                        <div className="flex justify-center items-center pb-20">
                            <div
                                className="relative w-2/3 max-w-80"
                                ref={coinRef}
                            >
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
                                        boxShadow: '0px 0px 20px 0px #bfdbfe',
                                    }}
                                />
                                <span
                                    className="w-[130%] h-[130%] absolute -left-[15%] -top-[15%] bg-blue-50 shadow-blue-200 rounded-full z-[2]"
                                    style={{
                                        boxShadow: '0px 0px 20px 0px #bfdbfe',
                                    }}
                                />
                                <span
                                    className="w-[150%] h-[150%] absolute -left-[25%] -top-[25%] bg-blue-50 shadow-blue-200 rounded-full z-[3]"
                                    style={{
                                        boxShadow: '0px 0px 20px 0px #bfdbfe',
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
                        <Withdraw balance={green} />
                    </BottomSheet>
                )}
            </div>
        </>
    );
}
