import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const payload = await request.json()
	const topUp = await fetchTopUp(payload)

	if (topUp.transactionStatus !== 'failed') {
		return NextResponse.json({ success: true })
	}

    return NextResponse.json({ success: false })

  } catch (error) {
    return NextResponse.json(
      { error: "Failed to validate payment" },
      { status: 400 }
    )
  }
} 

export const fetchTopUp = async (payload: Record<string, any>) => {
		//
	const response = await fetch(
		`https://developer.worldcoin.org/api/v2/minikit/transaction/${payload.transaction_id}?app_id=${process.env.WLD_CLIENT_ID}`,
		{
			method: 'GET',
			headers: { Authorization: `Bearer ${process.env.WLD_PORTAL_API_KEY}` },
		},
	);

	if (!response.ok) {
		console.error('Failed to fetch top up', await response.text());
		throw new Error('Failed to fetch top up');
	}

	return (await response.json()) as {
		reference: string;
		transactionId: string;
		transactionHash: string;
		transactionStatus: 'pending' | 'mined' | 'failed';
		miniappId: string;
		updatedAt: string; // ISO 8601
		network: 'worldchain';
		fromWalletAddress: string;
		recipientAddress: string;
		inputToken: string;
		inputTokenAmount: string; // amount in BigInt with 6 decimals
	};
}
