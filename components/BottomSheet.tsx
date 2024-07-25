import { ReactEventHandler } from 'react';
import { IoClose } from 'react-icons/io5';

export default function BottomSheet({
    children,
    close,
    dontHaveClose,
    haveGreen,
}: Readonly<{
    children: React.ReactNode;
    close: ReactEventHandler;
    dontHaveClose?: boolean;
    haveGreen?: boolean;
}>) {
    return (
        <>
            <div
                onClick={(e) => close(e)}
                className="bg-[#0d111c80] fixed h-screen flex items-end bottom-0 left-0 w-full z-[100] backdrop-blur-sm"
            ></div>
            <div
                className={`fixed h-auto bottom-0 left-0 w-full z-[100] ${
                    haveGreen ? 'pt-2 rounded-t-xl bg-primary-1' : ''
                }`}
            >
                <div className="bg-white rounded-t-xl">
                    {!dontHaveClose && (
                        <button
                            onClick={(e) => close(e)}
                            className="absolute -top-10 right-3 border border-secondary-2 rounded p-1"
                        >
                            <IoClose color="#b0b7b4" />
                        </button>
                    )}
                    {children}
                </div>
            </div>
        </>
    );
}
