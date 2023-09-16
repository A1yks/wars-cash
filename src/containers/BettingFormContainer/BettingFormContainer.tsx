import { BetTypes } from '@backend/services/game/types';
import BettingForm from 'composites/BettingForm';
import useAppSelector from 'hooks/useAppSelector';
import useErrorsHandler from 'hooks/useErrorsHandler';
import { useSnackbar } from 'notistack';
import { memo } from 'react';
import { usePlaceBetMutation } from 'store/api/bet';

function BettingFormContainer() {
    const { enqueueSnackbar } = useSnackbar();
    const user = useAppSelector((state) => state.user);
    const [placeBet, { isLoading: isPlacingBet }] = usePlaceBetMutation();

    const betHandler = useErrorsHandler(async (team: BetTypes, betAmount: number) => {
        await placeBet({ team, betAmount }).unwrap();
        enqueueSnackbar('Ставка принята', { variant: 'success' });
    });

    if (user === null) {
        return null;
    }

    return <BettingForm isPlacingBet={isPlacingBet} balance={user.balance} onBet={betHandler} />;
}

export default memo(BettingFormContainer);
