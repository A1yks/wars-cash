import c from 'clsx';
import styles from './TeamChance.module.scss';
import Image from 'next/image';

export type TeamChanceProps = {
    minValue: number;
    maxValue: number;
    percentageValue: number;
    teamType: 'red' | 'blue';
};

function TeamChance(props: TeamChanceProps) {
    const percent = ((props.maxValue - props.minValue) / props.percentageValue) * 100;
    const teamImgSrc = props.teamType === 'red' ? '/images/like.png' : '/images/dislike.png';

    return (
        <div className={styles.teamChance}>
            <div className={c('flex', 'center', styles.like, styles[props.teamType])}>
                <Image src={teamImgSrc} width={33} height={28} alt="" />
            </div>
            <span className={styles.percent}>{percent.toFixed(0)}%</span>
            <div className={c('flex', 'center', styles.numbers)}>
                {props.minValue} - {props.maxValue}
            </div>
        </div>
    );
}

export default TeamChance;
