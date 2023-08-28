import { TailSpin } from 'react-loader-spinner';

export type SpinnerProps = {
    size?: 'small' | 'medium' | 'large' | number;
    className?: string;
    color?: string;
};

function Spinner(props: SpinnerProps) {
    const { size = 'medium', color = '#9b9b9b' } = props;
    const sizes = {
        small: 20,
        medium: 30,
        large: 40,
    };
    const sizeNumber = typeof size === 'number' ? size : sizes[size];

    return (
        <TailSpin
            height={sizeNumber}
            width={sizeNumber}
            color={color}
            ariaLabel="tail-spin-loading"
            radius="1"
            wrapperClass={props.className}
            visible={true}
        />
    );
}

export default Spinner;
