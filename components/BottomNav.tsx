'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { ReactElement, Suspense, useEffect, useState } from 'react';
import { HiOutlineHome } from 'react-icons/hi';
import { LuSwords } from 'react-icons/lu';
import { TbMessage2, TbUsersPlus } from 'react-icons/tb';

const queryClient = new QueryClient();

export default function App() {
    return (
        <Suspense>
            <QueryClientProvider client={queryClient}>
                <BottomNav />
            </QueryClientProvider>
        </Suspense>
    );
}

function BottomNav() {
    const path = usePathname();
    const [routeIndex, setRouteIndex] = useState(0);
    const searchParams = useSearchParams();
    interface routesType {
        title: string;
        link: string;
        icon: ReactElement;
        id: number;
    }

    const routes: routesType[] = [
        {
            id: 0,
            title: 'Home',
            link: `/?user=${searchParams.get('user')}`,
            icon: (
                <HiOutlineHome
                    color={routeIndex === 0 ? 'white' : '#b0b7b4'}
                    className="w-6 h-6"
                />
            ),
        },
        {
            id: 1,
            title: 'Mine',
            link: `/mine/?user=${searchParams.get('user')}`,
            icon: (
                <LuSwords
                    color={routeIndex === 1 ? 'white' : '#b0b7b4'}
                    className="w-6 h-6"
                />
            ),
        },
        {
            id: 2,
            title: 'Referrals',
            link: `/referrals/?user=${searchParams.get('user')}`,
            icon: (
                <TbUsersPlus
                    color={routeIndex === 2 ? 'white' : '#b0b7b4'}
                    className="w-6 h-6"
                />
            ),
        },
        {
            id: 3,
            title: 'FAQ',
            link: `/faq/?user=${searchParams.get('user')}`,
            icon: (
                <TbMessage2
                    color={routeIndex === 3 ? 'white' : '#b0b7b4'}
                    className="w-6 h-6"
                />
            ),
        },
    ];

    useEffect(() => {
        switch (path) {
            case `/`:
                setRouteIndex(0);
                break;
            case `/mine`:
                setRouteIndex(1);
                break;
            case `/referrals`:
                setRouteIndex(2);
                break;
            case `/faq`:
                setRouteIndex(3);
                break;
        }
    }, [path]);
    return (
        <div className="fixed bottom-2 w-[93%] bg-secondary-1 grid grid-cols-4 gap-2 p-2 left-[3.5%] rounded-lg z-50">
            {routes.map((route) => {
                return (
                    <Link
                        href={route.link}
                        key={route.title}
                        className={`flex flex-col items-center p-1 rounded-md text-sm ${
                            routeIndex === route.id
                                ? 'text-white bg-primary-1'
                                : 'text-secondary-2 bg-white'
                        }`}
                    >
                        {route.icon}
                        {route.title}
                    </Link>
                );
            })}
        </div>
    );
}
