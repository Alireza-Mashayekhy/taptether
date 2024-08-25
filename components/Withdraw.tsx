'use client';
import Image from 'next/image';
import { ReactEventHandler, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { IoCopyOutline } from 'react-icons/io5';
import BottomSheet from './BottomSheet';
import { RiArrowDownSFill, RiErrorWarningLine } from 'react-icons/ri';
import { FaCheck } from 'react-icons/fa6';
import axiosInstance from '@/lib/axiosInstance';
import { useSearchParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';

export default function Withdraw({ balance }: { balance: number }) {
    const [TabIndex, setIndex] = useState(0);
    return (
        <div className="px-3 py-5 flex flex-col gap-5">
            <div className="grid grid-cols-3 p-2 rounded-lg border border-secondary-2 bg-secondary-1">
                <button
                    onClick={() => setIndex(0)}
                    className={`rounded pb-1 pt-0.5 font-semibold transition-all ${
                        TabIndex === 0
                            ? 'bg-primary-1 text-white'
                            : 'text-secondary-2'
                    }`}
                >
                    Deposit
                </button>
                <button
                    onClick={() => setIndex(1)}
                    className={`rounded pb-1 pt-0.5 font-semibold transition-all ${
                        TabIndex === 1
                            ? 'bg-primary-1 text-white'
                            : 'text-secondary-2'
                    }`}
                >
                    Withdraw
                </button>
                <button
                    onClick={() => setIndex(2)}
                    className={`rounded pb-1 pt-0.5 font-semibold transition-all ${
                        TabIndex === 2
                            ? 'bg-primary-1 text-white'
                            : 'text-secondary-2'
                    }`}
                >
                    History
                </button>
            </div>
            <TabContent
                balance={balance}
                index={TabIndex}
                showData={() => {
                    setIndex(3);
                }}
            />
        </div>
    );
}

function TabContent({
    balance,
    index,
    showData,
}: {
    balance: number;
    index: number;
    showData: () => void;
}) {
    const [isOpenSheet, setSheet] = useState(false);
    const [chain, setChain] = useState('ton');
    const [depositValue, setDepositValue] = useState(0);
    const [withDrawAddress, setWithDrawAddress] = useState('');
    const [withDraw, setWithDraw] = useState(0);
    const [depositData, setData] = useState({
        pay_amount: 0,
        pay_currency: '',
        pay_address: '',
    });
    const [timer, setTimer] = useState(1200);
    const searchParams = useSearchParams();

    const { isPending, error, data } = useQuery({
        queryKey: ['userHistory'],
        queryFn: async () => {
            const response = await axiosInstance.post('/payment-history/', {
                // params: {
                _id: searchParams.get('user'),
                token: searchParams.get('token'),
                // },
            });
            return response.data;
        },
    });

    const address = useRef<HTMLDivElement>(null);
    const copyText = () => {
        if (address.current)
            navigator.clipboard.writeText(address.current.innerHTML);
        toast.success('Successful');
    };

    const deposit = async () => {
        if (!depositValue) {
            toast.error('please fill all fields.');
        } else if (depositValue < 0.1) {
            console.log(depositValue);
            toast.error('Min. deposit is 0.1');
        } else {
            const formData = new FormData();
            formData.append('_id', searchParams.get('user') || '');
            formData.append('token', searchParams.get('token') || '');
            formData.append('price_amount', depositValue.toString());
            formData.append('price_currency', 'usdterc20');
            formData.append('pay_currency', 'usdterc20');
            await axiosInstance
                .post('/create-payment/', formData)
                .then((res) => {
                    setData(res?.data);
                    showData();
                    setInterval(() => {
                        setTimer((counter) => (counter > 0 ? counter - 1 : 0));
                    }, 1000);
                });
        }
    };
    const withdrawFunc = async () => {
        if (!withDraw || !chain || !withDrawAddress) {
            toast.error('please fill all fields.');
        } else if (withDraw < 1) {
            toast.error('Min. withdrawal is 1');
        } else if (withDraw > balance) {
            toast.error('your request is more than your balance.');
        } else {
            const formData = new FormData();
            formData.append('_id', searchParams.get('user') || '');
            formData.append('token', searchParams.get('token') || '');
            formData.append('price_amount', withDraw.toString());
            formData.append('price_currency', chain.toString());
            formData.append('address ', withDrawAddress);
            await axiosInstance.post('/create-payout/', formData);
        }
    };
    if (index === 0) {
        return (
            <div className="flex flex-col gap-3">
                {/* {isOpenSheet && (
                    <BottomSheet close={() => setSheet(false)}>
                        <div className="p-3 py-5">
                            <div className="text-lg font-semibold mb-3">
                                Select chain
                            </div>
                            <button
                                onClick={() => {
                                    setSheet(false);
                                    setChain('binance');
                                }}
                                className="w-full p-3 rounded-xl text-xl flex justify-between items-center"
                            >
                                <div
                                    className={`flex items-center gap-3 ${
                                        chain === 'binance'
                                            ? 'text-black'
                                            : 'text-secondary-2'
                                    }`}
                                >
                                    <Image
                                        src="/bsc.png"
                                        alt="binance"
                                        width={32}
                                        height={32}
                                    />
                                    Binance Smart Chain
                                </div>
                                {chain === 'binance' && (
                                    <div className="bg-primary-1 text-white p-1 rounded-lg">
                                        <FaCheck className="w-4 h-4" />
                                    </div>
                                )}
                            </button>
                            <button
                                onClick={() => {
                                    setSheet(false);
                                    setChain('tron');
                                }}
                                className="w-full p-3 rounded-xl text-xl flex justify-between items-center"
                            >
                                <div
                                    className={`flex items-center gap-3 ${
                                        chain === 'tron'
                                            ? 'text-black'
                                            : 'text-secondary-2'
                                    }`}
                                >
                                    <Image
                                        src="/trx.png"
                                        alt="binance"
                                        width={32}
                                        height={32}
                                    />
                                    Tron
                                </div>
                                {chain === 'tron' && (
                                    <div className="bg-primary-1 text-white p-1 rounded-lg">
                                        <FaCheck className="w-4 h-4" />
                                    </div>
                                )}
                            </button>
                        </div>
                    </BottomSheet>
                )} */}
                <div className="text-sm">
                    Send any amount of USDT to your deposit address
                </div>
                <button className="bg-secondary-1 p-3 rounded-xl text-xl font-semibold text-secondary-2 flex justify-between items-center">
                    <div className="flex items-center gap-3">
                        <Image
                            src="/coin.svg"
                            alt="binance"
                            width={32}
                            height={32}
                        />
                        Tether
                    </div>
                </button>
                {/* <div className="flex gap-1 mt-3">
                    <div
                        ref={address}
                        className="bg-secondary-1 p-3 rounded-xl text-xs w-full"
                    >
                        0xbe6d6448b9f0ad6a35732961d78fec44f13c72bb
                    </div>
                    <div
                        onClick={copyText}
                        className="bg-secondary-1 p-1 rounded-xl text-xs w-full flex justify-center items-center"
                    >
                        <IoCopyOutline color="#b0b7b4" className="w-6 h-6" />
                    </div>
                </div> */}
                <input
                    className="bg-secondary-1 outline-none text-2xl w-full rounded-xl p-3"
                    placeholder="0"
                    type="number"
                    onChange={(e: any) => setDepositValue(e.target.value)}
                />
                <div className="text-secondary-2">Min. deposit: 0.1 USDT</div>
                <button
                    onClick={deposit}
                    className="bg-primary-1 p-3 text-white rounded-xl"
                >
                    Deposit
                </button>
            </div>
        );
    } else if (index === 1) {
        return (
            <div>
                <div className="flex flex-col gap-3">
                    {isOpenSheet && (
                        <BottomSheet close={() => setSheet(false)}>
                            <div className="p-3 py-5">
                                <div className="text-lg font-semibold mb-3">
                                    Select chain
                                </div>
                                <button
                                    onClick={() => {
                                        setSheet(false);
                                        setChain('ton');
                                    }}
                                    className="w-full p-3 rounded-xl text-xl flex justify-between items-center"
                                >
                                    <div
                                        className={`flex items-center gap-3 ${
                                            chain === 'ton'
                                                ? 'text-black'
                                                : 'text-secondary-2'
                                        }`}
                                    >
                                        <Image
                                            src="/ton.png"
                                            alt="Ton"
                                            width={32}
                                            height={32}
                                        />
                                        Ton
                                    </div>
                                    {chain === 'ton' && (
                                        <div className="bg-primary-1 text-white p-1 rounded-lg">
                                            <FaCheck className="w-4 h-4" />
                                        </div>
                                    )}
                                </button>
                                <button
                                    onClick={() => {
                                        setSheet(false);
                                        setChain('tron');
                                    }}
                                    className="w-full p-3 rounded-xl text-xl flex justify-between items-center"
                                >
                                    <div
                                        className={`flex items-center gap-3 ${
                                            chain === 'tron'
                                                ? 'text-black'
                                                : 'text-secondary-2'
                                        }`}
                                    >
                                        <Image
                                            src="/trx.png"
                                            alt="binance"
                                            width={32}
                                            height={32}
                                        />
                                        Tron
                                    </div>
                                    {chain === 'tron' && (
                                        <div className="bg-primary-1 text-white p-1 rounded-lg">
                                            <FaCheck className="w-4 h-4" />
                                        </div>
                                    )}
                                </button>
                            </div>
                        </BottomSheet>
                    )}
                    <div className="bg-secondary-1 p-3 rounded-xl flex items-center gap-4">
                        <div className="p-1 rounded-full bg-white">
                            <Image
                                src="/coin.svg"
                                alt="coin"
                                className="min-w-6"
                                width={25}
                                height={25}
                            />
                        </div>
                        <div>
                            <div className="text-xl">USDT</div>
                            <div className="text-[10px] text-secondary-2 flex items-center gap-2 whitespace-nowrap">
                                Balance: {balance.toFixed(4)}
                                <button
                                    onClick={() => setWithDraw(balance)}
                                    className="text-[8px] rounded-full border border-secondary-2 px-1"
                                >
                                    MAX
                                </button>
                            </div>
                        </div>
                        <input
                            className="text-right bg-secondary-1 outline-none text-2xl w-full"
                            value={withDraw}
                            placeholder="0"
                            onChange={(e: any) => setWithDraw(e.target.value)}
                        />
                    </div>
                    <button
                        onClick={() => setSheet(true)}
                        className="bg-secondary-1 p-3 rounded-xl text-xl font-semibold text-secondary-2 flex justify-between items-center"
                    >
                        {chain === 'binance' ? (
                            <div className="flex items-center gap-3">
                                <Image
                                    src="/bsc.png"
                                    alt="binance"
                                    width={32}
                                    height={32}
                                />
                                Binance Smart Chain
                            </div>
                        ) : chain === 'tron' ? (
                            <div className="flex items-center gap-3">
                                <Image
                                    src="/trx.png"
                                    alt="binance"
                                    width={32}
                                    height={32}
                                />
                                Tron
                            </div>
                        ) : (
                            <div className="flex items-center gap-3">
                                <Image
                                    src="/ton.png"
                                    alt="binance"
                                    width={32}
                                    height={32}
                                />
                                Ton
                            </div>
                        )}
                        <RiArrowDownSFill />
                    </button>
                    <input
                        placeholder="Enter your address"
                        className="bg-secondary-1 rounded-xl p-4 text-sm outline-none"
                        onChange={(e) => {
                            setWithDrawAddress(e.target.value);
                        }}
                    />
                    <div className="bg-[#ff1b51] flex items-center gap-3 text-white p-3 py-2 rounded-xl text-xs">
                        <RiErrorWarningLine className="w-6 h-6" />
                        No balance or minimal withdrawal
                    </div>
                    <div className="text-sm text-secondary-2 my-3">
                        Min. withdrawal: 1 USDT
                    </div>
                    <button
                        onClick={withdrawFunc}
                        className="w-full py-3 text-white bg-primary-1 text-center rounded-xl"
                    >
                        Withdraw
                    </button>
                </div>
            </div>
        );
    } else if (index === 2) {
        return (
            <div className="flex flex-col gap-3">
                {!data?.payments?.length ? (
                    <div className="bg-secondary-1 text-2xl font-semibold text-center py-14 rounded-xl">
                        Empty list
                    </div>
                ) : (
                    data?.payments?.map((item: any) => {
                        return (
                            <div className="w-full p-3 bg-secondary-1 rounded-xl border border-secondary-2 items-center grid grid-cols-3">
                                <div>{item.payment_id}</div>
                                <div>{item?.payment_date.split('T')[0]}</div>
                                <div className="flex justify-end">
                                    {item?.is_paid && (
                                        <div className="px-2 py-1 text-white text-sm rounded-lg bg-primary-1">
                                            paid
                                        </div>
                                    )}
                                </div>
                            </div>
                        );
                    })
                )}
            </div>
        );
    } else if (index === 3) {
        return (
            <div className="flex flex-col gap-3">
                <div className="flex flex-col gap-1">
                    <div>amount</div>
                    <div className="flex gap-2">
                        <div className="bg-secondary-1 w-full rounded-lg p-3">
                            {depositData?.pay_amount}
                        </div>
                        <div
                            onClick={() => {
                                navigator.clipboard.writeText(
                                    depositData?.pay_amount.toString()
                                );
                                toast.success('copied successfully.');
                            }}
                            className="bg-secondary-1 min-w-12 w-12 flex items-center justify-center rounded-lg"
                        >
                            <IoCopyOutline size={20} />
                        </div>
                    </div>
                </div>
                <div className="flex flex-col gap-1">
                    <div>address</div>
                    <div className="flex gap-2">
                        <div className="bg-secondary-1 w-full rounded-lg p-3 truncate">
                            {depositData?.pay_address}
                        </div>
                        <div
                            onClick={() => {
                                navigator.clipboard.writeText(
                                    depositData?.pay_address.toString()
                                );
                                toast.success('copied successfully.');
                            }}
                            className="bg-secondary-1 min-w-12 w-12 flex items-center justify-center rounded-lg"
                        >
                            <IoCopyOutline size={20} />
                        </div>
                    </div>
                </div>
                <div className="flex flex-col gap-1">
                    <div>currency</div>
                    <div className="flex gap-2">
                        <div className="bg-secondary-1 w-full rounded-lg p-3">
                            {depositData?.pay_currency}
                        </div>
                        <div
                            onClick={() => {
                                navigator.clipboard.writeText(
                                    depositData?.pay_currency.toString()
                                );
                                toast.success('copied successfully.');
                            }}
                            className="bg-secondary-1 min-w-12 w-12 flex items-center justify-center rounded-lg"
                        >
                            <IoCopyOutline size={20} />
                        </div>
                    </div>
                </div>
                <div className="bg-primary-1 text-white w-full rounded-lg p-3 text-center">
                    {Math.floor(timer / 60) < 10
                        ? '0' + Math.floor(timer / 60)
                        : Math.floor(timer / 60)}{' '}
                    : {timer % 60 < 10 ? '0' + (timer % 60) : timer % 60}
                </div>
            </div>
        );
    }
}
