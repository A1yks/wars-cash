import c from 'clsx';
import styles from './Spinner.module.scss';

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
        <div className={c(styles.spinner, props.className)}>
            <svg width={sizeNumber} height={sizeNumber} viewBox="0 0 38 38" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <linearGradient x1="8.042%" y1="0%" x2="65.682%" y2="23.865%" id="a">
                        <stop stopColor="#9b9b9b" stopOpacity="0" offset="0%"></stop>
                        <stop stopColor="#9b9b9b" stopOpacity=".631" offset="63.146%"></stop>
                        <stop stopColor="#9b9b9b" offset="100%"></stop>
                    </linearGradient>
                </defs>
                <g fill="none" fillRule="evenodd">
                    <g transform="translate(1 1)">
                        <path d="M36 18c0-9.94-8.06-18-18-18" id="Oval-2" stroke="#9b9b9b" strokeWidth="2"></path>
                        <circle fill="#fff" cx="36" cy="18" r="1"></circle>
                    </g>
                </g>
            </svg>
        </div>
    );
}

export default Spinner;
