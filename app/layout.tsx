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
    useEffect(() => {
        const app = (window as any).Telegram?.WebApp;
        if (app) {
            app.ready();
        }
    }, []);
    return (
        <html lang="en">
            <head>
                <script src="https://telegram.org/js/telegram-web-app.js"></script>
            </head>
            <body>
                <Toaster position="top-center" />
                <div className="overflow-hidden">{children}</div>
                <BottomNav />
            </body>
        </html>
    );
}
