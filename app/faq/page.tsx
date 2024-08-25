import FaqCard from '@/components/FaqCard';
import Image from 'next/image';

export default function faq() {
    return (
        <div className="bg-secondary-1 pt-16 pb-20 min-h-screen">
            <div className="rounded-t-3xl bg-primary-1 relative">
                <div className="py-5 px-3 text-white">
                    <div className="text-2xl font-semibold relative z-10">
                        FAQ
                    </div>
                    <div className="text-sm relative z-10">
                        Find answers to frequently asked questions
                    </div>
                    <Image
                        src="/question.svg"
                        alt="question"
                        width={140}
                        height={140}
                        className="absolute right-0 -top-14 z-10"
                    />
                    <span className="w-8 h-8 rounded-md bg-[#1cb58690] absolute right-32 top-7 rotate-45" />
                    <span className="w-24 h-24 rounded-md bg-[#1cb58690] absolute right-0 top-5 rotate-45" />
                </div>

                <div className="rounded-t-3xl bg-white relative z-10 grid grid-cols-1 py-6 px-3 gap-1">
                    {[...new Array(10)].map((faq) => {
                        return (
                            <FaqCard
                                key={`faq-${faq}`}
                                question="What is TapTether?"
                                answer="TapTether is a new project with a revamped Tap-to-Earn mechanic, designed specifically for the crypto community. Here, you can tap to earn one of the most popular stablecoins, USDT, which is easy to withdraw from the platform, and also tUSD – project's native token that will make you eligible for airdrop. The app is available on TON and some other networks."
                            />
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
