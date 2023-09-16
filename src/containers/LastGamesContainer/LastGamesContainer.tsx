import LastGames from 'composites/LastGames';
import useAppSelector from 'hooks/useAppSelector';

function LastGamesContainer() {
    const lastGames = useAppSelector((state) => state.lastGames.simpleResults);

    return <LastGames data={lastGames} />;
}

export default LastGamesContainer;
