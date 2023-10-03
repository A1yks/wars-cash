import BankList from 'composites/BankList';
import useAppSelector from 'hooks/useAppSelector';

function BlueBankListContainer() {
    const { bank, bettors, coeff } = useAppSelector((state) => state.game.blueTeam);
    const title = `Банк: ${bank}`;

    return <BankList title={title} bets={bettors} coeff={coeff} variant="blue" />;
}

export default BlueBankListContainer;
