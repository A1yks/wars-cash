import c from 'clsx';
import styles from './ImageCropper.module.scss';
import Cropper, { CropperProps } from 'react-easy-crop';
import ReactSlider from 'react-slider';

export type ImageCropperProps = CropperProps & { className?: string };

function ImageCropper(props: ImageCropperProps) {
    return (
        <div className={c(styles.cropper, props.className)}>
            <Cropper {...props} />
            <div className={styles.controls}>
                <ReactSlider
                    className="horizontal-slider"
                    thumbClassName="example-thumb"
                    trackClassName="example-track"
                    renderThumb={(props, state) => <div {...props}>{state.valueNow}</div>}
                />
            </div>
        </div>
    );
}

export default ImageCropper;
