import c from 'clsx';
import styles from './WinProbabilities.module.scss';
import Block from 'composites/Block';
import Image from 'next/image';
import TeamChance from 'components/TeamChance';
import { TeamChanceProps } from 'components/TeamChance/TeamChance';

type TeamInfo = Omit<TeamChanceProps, 'teamType' | 'percentageValue'>;

export type WinProbabilitiesProps = {
    redTeamInfo: TeamInfo;
    blueTeamInfo: TeamInfo;
    percentageValue: TeamChanceProps['percentageValue'];
};

function WinProbabilities(props: WinProbabilitiesProps) {
    const { redTeamInfo, blueTeamInfo, percentageValue } = props;

    return (
        <Block title="Честная игра" rightContent={<Image src="/images/gamepad.png" width={64} height={61} alt="" />}>
            <div className={styles.content}>
                <TeamChance {...redTeamInfo} percentageValue={percentageValue} teamType="red" />
                <div className={styles.separator} />
                <TeamChance {...blueTeamInfo} percentageValue={percentageValue} teamType="blue" />
            </div>
        </Block>
    );
}

export default WinProbabilities;
