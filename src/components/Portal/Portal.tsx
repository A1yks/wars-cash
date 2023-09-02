import { ReactNode } from 'react';
import { createPortal } from 'react-dom';

export type PortalProps = {
    to?: HTMLElement;
    children: ReactNode;
};

function Portal(props: PortalProps) {
    // if (!process.browser) return null;

    return createPortal(props.children, props.to || document.body);
}

export default Portal;
