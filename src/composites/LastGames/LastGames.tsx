import c from 'clsx';
import styles from './LastGames.module.scss';
import BlockContainer from 'components/BlockContainer';
import BlockHeader from 'components/BlockHeader';
import Image from 'next/image';
import Results from 'components/Results';
import { BetTypes } from '@backend/services/game/types';
import { memo } from 'react';

export type LastGamesProps = {
    className?: string;
    data: BetTypes[];
    sliceData?: boolean;
};

const MAX_RESULTS = 8;

function LastGames(props: LastGamesProps) {
    const data = props.sliceData ? props.data.slice(-MAX_RESULTS) : props.data;

    return (
        <BlockContainer className={c(styles.lastGames, props.className)}>
            <BlockHeader title="Последние игры" rightContent={<Image src="/images/notes.png" width={62} height={54} alt="" />} />
            <div className={c(styles.content, 'flex', 'center')}>{data.length === 0 ? 'Нет данных' : <Results data={data} />}</div>
        </BlockContainer>
    );
}

export default memo(LastGames);
