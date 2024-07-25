'use client';
import Image from 'next/image';
import { useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { IoCopyOutline } from 'react-icons/io5';
import BottomSheet from './BottomSheet';
import { RiArrowDownSFill, RiErrorWarningLine } from 'react-icons/ri';
import { FaCheck } from 'react-icons/fa6';

export default function Withdraw() {
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
            {tabContent(TabIndex)}
        </div>
    );
}

function tabContent(index: number) {
    const [isOpenSheet, setSheet] = useState(false);
    const [chain, setChain] = useState('binance');
    const [withDrawChain, setWithDrawChain] = useState('binance');
    const [withDraw, setWithDraw] = useState(0);

    const address = useRef<HTMLDivElement>(null);
    const copyText = () => {
        if (address.current)
            navigator.clipboard.writeText(address.current.innerHTML);
        toast.success('Successful');
    };
    if (index === 0) {
        return (
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
                )}
                <div className="text-sm">
                    Send any amount of USDT to your deposit address
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
                    ) : (
                        <div className="flex items-center gap-3">
                            <Image
                                src="/trx.png"
                                alt="binance"
                                width={32}
                                height={32}
                            />
                            Tron
                        </div>
                    )}
                    <RiArrowDownSFill />
                </button>
                <div className="flex gap-1 mt-3">
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
                </div>
                <div className="text-secondary-2">Min. deposit: 0.1 USDT</div>
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
                                Balance: 0.000020
                                <button
                                    onClick={() => setWithDraw(0.00002)}
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
                    />
                    <div className="bg-[#ff1b51] flex items-center gap-3 text-white p-3 py-2 rounded-xl text-xs">
                        <RiErrorWarningLine className="w-6 h-6" />
                        No balance or minimal withdrawal
                    </div>
                    <div className="text-sm text-secondary-2 my-3">
                        Min. withdrawal: 1 USDT
                    </div>
                    <button className="w-full py-3 text-white bg-primary-1 text-center rounded-xl">
                        Withdraw
                    </button>
                </div>
            </div>
        );
    } else if (index === 2) {
        return (
            <div className="flex flex-col gap-3">
                <div className="bg-secondary-1 text-2xl font-semibold text-center py-14 rounded-xl">
                    Empty list
                </div>
            </div>
        );
    }
}
