export type IconProps = {
    src: string;
    width?: number | string;
    height?: number | string;
} & React.ComponentPropsWithoutRef<'div'>;

function Icon(props: IconProps) {
    const { src, width, height, ...divProps } = props;

    return (
        <div
            style={{
                background: `url(${src}) center no-repeat`,
                width,
                height,
            }}
            {...divProps}
        />
    );
}

export default Icon;
