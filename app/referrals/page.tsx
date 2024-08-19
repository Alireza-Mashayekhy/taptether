'use client';
import axiosInstance from '@/lib/axiosInstance';
import {
    QueryClient,
    QueryClientProvider,
    useQuery,
} from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import toast from 'react-hot-toast';
import { GoPlus } from 'react-icons/go';
import { LuCopy, LuRefreshCw } from 'react-icons/lu';

const queryClient = new QueryClient();

export default function App() {
    return (
        <Suspense>
            <QueryClientProvider client={queryClient}>
                <Referrals />
            </QueryClientProvider>
        </Suspense>
    );
}

function Referrals() {
    const searchParams = useSearchParams();
    async function fetchRefferrals() {
        const response = await axiosInstance.get('/referrals', {
            params: {
                _id: searchParams.get('user'),
                token: searchParams.get('token'),
            },
        });
        return response.data;
    }

    async function fetchLink() {
        const response = await axiosInstance.get('/invite-code', {
            params: {
                _id: searchParams.get('user'),
                token: searchParams.get('token'),
            },
        });
        return response.data;
    }

    const { isPending, error, data, refetch } = useQuery({
        queryKey: ['repoData'],
        queryFn: () => fetchRefferrals(),
    });

    const { data: inviteLink } = useQuery({
        queryKey: ['linkData'],
        queryFn: () => fetchLink(),
    });

    const copyLink = () => {
        navigator.clipboard.writeText(inviteLink?.invite_code);
        toast.success('link copied');
    };

    interface referralType {
        first_name: string;
        last_name: string;
    }

    return (
        <div className="bg-secondary-1 pt-16">
            <div className="rounded-t-3xl bg-primary-1 relative pt-1">
                <div className="py-8 px-3 bg-white rounded-t-3xl flex flex-col gap-5 ">
                    <div>
                        <div className="text-2xl font-semibold">
                            Invite friends!
                        </div>
                        <div className="text-xs mt-1 text-secondary-2">
                            You will also earn 10% of the referral's income.
                        </div>
                    </div>
                    <div>
                        <div className="flex justify-between items-center">
                            <div className="text-xs font-semibold">
                                List of your friends ({data?.length})
                            </div>
                            <button
                                onClick={() => {
                                    refetch();
                                    toast.success('refreshed successfully');
                                }}
                            >
                                <LuRefreshCw />
                            </button>
                        </div>
                        <div className="bg-secondary-1 mt-3 py-10 rounded-xl">
                            <div className="text-center text-2xl font-semibold">
                                {data?.length} friends!
                            </div>
                            <div className="text-center text-xs font-semibold text-secondary-2">
                                You and your friend will receive bonuses
                            </div>
                        </div>
                        <div className="flex flex-col gap-3 mt-3">
                            {data?.map((referral: referralType) => {
                                return (
                                    <div
                                        key={referral.first_name}
                                        className="bg-secondary-1 p-2 rounded-lg text-center"
                                    >
                                        {referral.first_name}{' '}
                                        {referral.last_name}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                    <div className="fixed bottom-[85px] flex gap-2 w-[93%] left-[3.5%]">
                        <a
                            href={inviteLink?.invite_code}
                            className="w-full bg-primary-1 text-center text-white font-semibold flex gap-2 items-center justify-center py-3 rounded-lg"
                        >
                            <GoPlus className="w-6 h-6" /> Invite a friend
                        </a>
                        <button
                            onClick={copyLink}
                            className="bg-primary-1 flex items-center justify-center px-3 rounded-lg"
                        >
                            <LuCopy className="w-6 h-6" color="white" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
