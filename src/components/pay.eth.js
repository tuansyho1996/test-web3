'use client';

import { useState } from 'react';
import { useAccount, useSendTransaction, useWaitForTransactionReceipt } from 'wagmi';
import { parseEther } from 'viem';

const storeAddress = '0x47FC4431f83670D2d3e6f96AfE128b6F810e0D19'; // Thay bằng ví cửa hàng thực tế

export default function CheckoutButton({ priceInEth }) {
    const { isConnected } = useAccount();

    const [txHash, setTxHash] = useState(null);
    const [success, setSuccess] = useState(false);

    const {
        data: hashData,
        sendTransaction,
        isPending,
        error,
        isError,
    } = useSendTransaction();

    const { isLoading: isConfirming } = useWaitForTransactionReceipt({
        hash: hashData,
        onSuccess: () => {
            setSuccess(true);
            alert('💸 Thanh toán thành công!');
        },
        onError: () => {
            alert('❌ Giao dịch thất bại sau khi gửi.');
        },
    });

    const handlePay = () => {
        if (!isConnected) {
            alert('⚠️ Vui lòng kết nối ví trước khi thanh toán.');
            return;
        }

        sendTransaction({
            to: storeAddress,
            value: parseEther(priceInEth.toString()),
        });
    };

    return (
        <div className="p-4">
            <button
                onClick={handlePay}
                disabled={isPending || isConfirming}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
                {isPending || isConfirming ? 'Đang xử lý...' : `Thanh toán ${priceInEth} ETH`}
            </button>

            {isError && (
                <p className="text-red-500 mt-2">
                    ⚠️ Lỗi: {error?.message || 'Không rõ nguyên nhân'}
                </p>
            )}

            {txHash && (
                <p className="mt-2">
                    Đã gửi:{" "}
                    <a
                        href={`https://sepolia.etherscan.io/tx/${txHash}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 underline"
                    >
                        {txHash.slice(0, 10)}...
                    </a>
                </p>
            )}
        </div>
    );
}
