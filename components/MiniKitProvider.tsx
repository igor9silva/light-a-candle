"use client";

import { MiniKit } from '@worldcoin/minikit-js';
import { ReactNode, useEffect } from 'react';

export default function MiniKitProvider({ children, appId }: { children: ReactNode, appId: string }) {
	//
	useEffect(() => {
		MiniKit.install(appId);
	}, []);

	return <>{children}</>;
}
