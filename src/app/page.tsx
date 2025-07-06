'use client';
import Image from "next/image";
import { ConnectButton } from '@rainbow-me/rainbowkit'
import CheckoutButton from "@/components/pay.eth";


export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <h1>Hello Web3</h1>
        <ConnectButton />
        <CheckoutButton priceInEth={0.000001} />
      </main>
    </div>
  );
}
