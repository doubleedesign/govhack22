import React, { useRef } from 'react';
import { deepCompareEqualsForMaps } from '../utils/utils';

export function useDeepCompareMemoize(value: any) {
	const ref = useRef();

	if (!deepCompareEqualsForMaps(value, ref.current)) {
		ref.current = value;
	}

	return ref.current;
}