import c from 'clsx';
import styles from './MainContent.module.scss';
import Container from 'components/Container';
import BettingFormContainer from 'containers/BettingFormContainer/BettingFormContainer';
import WinProbabilitiesContainer from 'containers/WinProbabilitiesContainer';
import GameSpinnerContainer from 'containers/GameSpinnerContainer';
import RedBankListContainer from 'containers/RedBankListContainer';
import BlueBankListContainer from 'containers/BlueBankListContainer';
import LastGamesContainer from 'containers/LastGamesContainer';
import ChatContainer from 'containers/ChatContainer';

function MainContent() {
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
