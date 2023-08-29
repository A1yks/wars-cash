export type IconProps = {
    src: string;
    width?: number | string;
    height?: number | string;
    className?: string;
};

function Icon(props: IconProps) {
    const { src, width = '100%', height = '100%', className } = props;

    return (
        <div
            style={{
                background: `url(${src}) center no-repeat`,
                width,
                height,
            }}
            className={className}
        />
    );
}

export default Icon;
