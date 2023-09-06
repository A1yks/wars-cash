function preventBubbling(e: React.MouseEvent<HTMLElement>) {
    e.stopPropagation();
}

export default preventBubbling;
