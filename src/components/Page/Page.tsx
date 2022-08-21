import React, { PropsWithChildren } from 'react';
import { PageWrapper } from './PageWrapper.style';

const Page: React.FC<PropsWithChildren> = ({ children }) => {
	return (
		<PageWrapper>
			{children}
		</PageWrapper>
	);
};

export default Page;