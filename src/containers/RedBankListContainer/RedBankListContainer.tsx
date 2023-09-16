import BankList from 'composites/BankList';
import useAppSelector from 'hooks/useAppSelector';

function RedBankListContainer() {
    const { bank, bettors, coeff } = useAppSelector((state) => state.game.redTeam);
    const title = `Банк: ${bank}`;

    return <BankList title={title} bets={bettors} coeff={coeff} variant="red" />;
}

export default RedBankListContainer;
