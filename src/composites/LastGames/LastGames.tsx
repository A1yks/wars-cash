import c from 'clsx';
import styles from './LastGames.module.scss';
import BlockContainer from 'components/BlockContainer';
import BlockHeader from 'components/BlockHeader';
import Image from 'next/image';
import Results from 'components/Results';
import { BetTypes } from 'types/global';

export type LastGamesProps = {
    className?: string;
    data: BetTypes[];
};

const MAX_RESULTS = 8;

function LastGames(props: LastGamesProps) {
    return (
        <BlockContainer className={c(styles.lastGames, props.className)}>
            <BlockHeader title="Последние игры" rightContent={<Image src="/images/notes.png" width={62} height={54} alt="" />} />
            <div className={styles.content}>
                <Results data={props.data.slice(-MAX_RESULTS)} />
            </div>
        </BlockContainer>
    );
}

export default LastGames;
