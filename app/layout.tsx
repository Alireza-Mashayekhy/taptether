'use client';
import './globals.css';
import BottomNav from '@/components/BottomNav';
import { Toaster } from 'react-hot-toast';

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body>
                <Toaster position="top-center" />
                <div className="overflow-hidden min-h-screen">{children}</div>
                <BottomNav />
            </body>
        </html>
    );
}
