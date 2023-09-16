import WinProbabilities from 'composites/WinProbabilities';
import useAppSelector from 'hooks/useAppSelector';

function WinProbabilitiesContainer() {
    const { percentageValue, blueTeam, redTeam } = useAppSelector((state) => state.game);

    return <WinProbabilities percentageValue={percentageValue} blueTeam={blueTeam} redTeam={redTeam} />;
}

export default WinProbabilitiesContainer;
