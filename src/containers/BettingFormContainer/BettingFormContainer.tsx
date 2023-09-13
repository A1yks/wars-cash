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

    function placeBetHelper(team: BetTypes) {
        return async (betAmount: number) => {
            await placeBet({ team, betAmount }).unwrap();
            enqueueSnackbar('Ставка принята', { variant: 'success' });
        };
    }

    const blueTeamBetHandler = useErrorsHandler(placeBetHelper(BetTypes.Blue));

    const redTeamBetHandler = useErrorsHandler(placeBetHelper(BetTypes.Red));

    if (user === null) {
        return null;
    }

    return <BettingForm isPlacingBet={isPlacingBet} balance={user.balance} onBlueTeamBet={blueTeamBetHandler} onRedTeamBet={redTeamBetHandler} />;
}

export default memo(BettingFormContainer);
