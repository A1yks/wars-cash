import { useLayoutEffect } from 'react';

const useBrowserLayoutEffect = typeof window === 'undefined' ? () => {} : useLayoutEffect; // eslint-disable-line

export default useBrowserLayoutEffect;
