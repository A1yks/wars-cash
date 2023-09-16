import styles from './WinProbabilities.module.scss';
import Block from 'composites/Block';
import Image from 'next/image';
import TeamChance from 'components/TeamChance';
import { memo } from 'react';
import { GameData } from '@backend/services/game/types';

export type WinProbabilitiesProps = {
    redTeam: {
        percent: number;
        values: [number, number];
    };
    blueTeam: {
        percent: number;
        values: [number, number];
    };
    percentageValue: number;
};

function WinProbabilities(props: WinProbabilitiesProps) {
    const {
        redTeam: {
            percent: redPercent,
            values: [minRedValue, maxRedValue],
        },
        blueTeam: {
            percent: bluePercent,
            values: [minBlueValue, maxBlueValue],
        },
        percentageValue,
    } = props;

    return (
        <Block title="Честная игра" rightContent={<Image src="/images/gamepad.png" width={64} height={61} alt="" />}>
            <div className={styles.content}>
                <TeamChance percent={redPercent} minValue={minRedValue} maxValue={maxRedValue} percentageValue={percentageValue} teamType="red" />
                <div className={styles.separator} />
                <TeamChance percent={bluePercent} minValue={minBlueValue} maxValue={maxBlueValue} percentageValue={percentageValue} teamType="blue" />
            </div>
        </Block>
    );
}

export default memo(WinProbabilities);
