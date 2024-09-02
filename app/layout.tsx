import '@/css/style.css';
import type { ReactNode } from 'react';

import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function RootLayout({ children }: { children: ReactNode }) {
	return (
		<html lang="de">
			<body>
				<div className="site-wrapper">
					<Header />
					<div className="site-content">{children}</div>
					<Footer />
				</div>
			</body>
		</html>
	);
}
