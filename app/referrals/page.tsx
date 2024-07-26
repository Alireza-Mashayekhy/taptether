'use client';
import { GoPlus } from 'react-icons/go';
import { LuCopy, LuRefreshCw } from 'react-icons/lu';

export default function Referrals() {
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
                                List of your friends (0)
                            </div>
                            <button>
                                <LuRefreshCw />
                            </button>
                        </div>
                        <div className="bg-secondary-1 mt-3 py-10 rounded-xl">
                            <div className="text-center text-2xl font-semibold">
                                0 friends!
                            </div>
                            <div className="text-center text-xs font-semibold text-secondary-2">
                                You and your friend will receive bonuses
                            </div>
                        </div>
                    </div>
                    <div className="fixed bottom-[85px] flex gap-2 w-[93%]">
                        <button className="w-full bg-primary-1 text-center text-white font-semibold flex gap-2 items-center justify-center py-3 rounded-lg">
                            <GoPlus className="w-6 h-6" /> Invite a friend
                        </button>
                        <button className="bg-primary-1 flex items-center justify-center px-3 rounded-lg">
                            <LuCopy className="w-6 h-6" color="white" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
