'use client';
import { useState } from 'react';
import { FaChevronDown } from 'react-icons/fa6';

interface PropsType {
    question: string;
    answer: string;
}

export default function FaqCard(props: PropsType) {
    const [isOpen, setOpen] = useState(false);
    return (
        <div
            onClick={() => setOpen(!isOpen)}
            className={`bg-secondary-1 p-3 rounded-xl overflow-hidden ${
                isOpen ? 'max-h-[500px]' : ' max-h-[50px]'
            }`}
            style={{ transition: 'max-height .5s ease' }}
        >
            <div className="flex items-center justify-between">
                <div className="text-xs font-bold">{props.question}</div>
                <div
                    className={`p-1 rounded-[0.6rem] border-2 border-[#D7DBD9]  ${
                        isOpen ? 'rotate-180' : ''
                    }`}
                    style={{ transition: 'all .5s ease' }}
                >
                    <FaChevronDown color="#D7DBD9" />
                </div>
            </div>
            <p className="text-xs mt-2">{props.answer}</p>
        </div>
    );
}
