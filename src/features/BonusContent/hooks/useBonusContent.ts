import dayjs from 'dayjs';
import useAppSelector from 'hooks/useAppSelector';
import useErrorsHandler from 'hooks/useErrorsHandler';
import { useSnackbar } from 'notistack';
import { useClaimBonusMutation, useGetBonusInfoQuery } from 'store/api/bonus';

function useBonusContent() {
    const { enqueueSnackbar } = useSnackbar();
    const { isFetching: isGettingBonusInfo } = useGetBonusInfoQuery();
    const [claimBonusMutation, { isLoading: isClaimingBonus }] = useClaimBonusMutation();
    const bonusAvailabilityTime = useAppSelector((state) => state.bonus.availabilityTime);
    const isBonusAvailable = Date.now() >= bonusAvailabilityTime;
    const bonusText = isBonusAvailable ? 'Бонус уже доступен!' : `Бонус будет доступен ${dayjs(bonusAvailabilityTime).format('DD.MM.YYYY в HH:mm')}`;

    const claimBonusHandler = useErrorsHandler(async (e: React.FormEvent) => {
        e.preventDefault();
        await claimBonusMutation().unwrap();
        enqueueSnackbar('Бонус успешно получен!', { variant: 'success' });
    });

    return { isGettingBonusInfo, isClaimingBonus, isBonusAvailable, bonusText, claimBonusHandler };
}

export default useBonusContent;
