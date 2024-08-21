'use client';
import './globals.css';
import BottomNav from '@/components/BottomNav';
import { Toaster } from 'react-hot-toast';
import { useEffect } from 'react';

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body>
                <Toaster position="top-center" />
                <div className="overflow-hidden">{children}</div>
                <BottomNav />
            </body>
        </html>
    );
}
