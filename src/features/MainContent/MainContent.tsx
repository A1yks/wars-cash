import c from 'clsx';
import styles from './MainContent.module.scss';
import Header from 'composites/Header';
import GameSpinner from 'components/GameSpinner';
import Chat from 'composites/Chat';
// TODO delete
import meta from 'composites/Chat/Chat.stories';
import BettingForm from 'composites/BettingForm';
import WinProbabilities from 'composites/WinProbabilities';
import { BetTypes } from '@backend/services/game/types';
import LastGames from 'composites/LastGames';
import Container from 'components/Container';
import BankList from 'composites/BankList';
// TODO delete
import bankListMeta, { BlueBankList, RedBankList } from 'composites/BankList/BankList.stories';
import useAppSelector from 'hooks/useAppSelector';
import BettingFormContainer from 'containers/BettingFormContainer/BettingFormContainer';
import WinProbabilitiesContainer from 'containers/WinProbabilitiesContainer';
import GameSpinnerContainer from 'containers/GameSpinnerContainer';
import RedBankListContainer from 'containers/RedBankListContainer';
import BlueBankListContainer from 'containers/BlueBankListContainer';
import LastGamesContainer from 'containers/LastGamesContainer';
import ChatContainer from 'containers/ChatContainer';

function MainContent() {
    const user = useAppSelector((state) => state.user);

    return (
        <div className={styles.mainWrapper}>
            <Container className={styles.mainContainer}>
                <div className={styles.leftSide}>
                    <BettingFormContainer />
                    <WinProbabilitiesContainer />
                    <LastGamesContainer />
                </div>
                <div className={c(styles.gameSpinner, 'flex', 'center')}>
                    <GameSpinnerContainer />
                </div>
                <div className={styles.rightSide}>
                    <ChatContainer />
                </div>
            </Container>
            <Container className={styles.bankLists}>
                <div className={styles.bankList}>
                    <RedBankListContainer />
                </div>
                <div className={styles.bankList}>
                    <BlueBankListContainer />
                </div>
            </Container>
        </div>
    );
}

export default MainContent;
