import c from 'clsx';
import styles from './MainContent.module.scss';
import Header from 'composites/Header';
import GameSpinner from 'components/GameSpinner';
import Chat from 'composites/Chat';
// TODO delete
import meta from 'composites/Chat/Chat.stories';
import BettingForm from 'composites/BettingForm';
import WinProbabilities from 'composites/WinProbabilities';
import { BetTypes } from 'types/global';
import LastGames from 'composites/LastGames';
import Container from 'components/Container';
import BankList from 'composites/BankList';
// TODO delete
import bankListMeta, { BlueBankList, RedBankList } from 'composites/BankList/BankList.stories';
import useAppSelector from 'hooks/useAppSelector';

function MainContent() {
    const user = useAppSelector((state) => state.auth.user);

    return (
        <div className={styles.mainWrapper}>
            <Container className={styles.mainContainer}>
                <div className={styles.leftSide}>
                    <BettingForm balance={100} onBlueTeamBet={() => {}} onRedTeamBet={() => {}} />
                    <WinProbabilities
                        percentageValue={1000}
                        redTeamInfo={{ minValue: 1, maxValue: 532 }}
                        blueTeamInfo={{ minValue: 533, maxValue: 1000 }}
                    />
                    <LastGames
                        data={[BetTypes.Blue, BetTypes.Red, BetTypes.Red, BetTypes.Blue, BetTypes.Red, BetTypes.Blue, BetTypes.Blue, BetTypes.Red]}
                    />
                </div>
                <div className={c(styles.gameSpinner, 'flex', 'center')}>
                    <GameSpinner blueColorPercent={47} text="57" />
                </div>
                <div className={styles.rightSide}>
                    <Chat inChat={257} isLoggedIn={user !== null} messages={meta.args.messages} />
                </div>
            </Container>
            <Container className={styles.bankLists}>
                <BankList bets={bankListMeta.args.bets} {...RedBankList.args} className={styles.bankList} />
                <BankList bets={bankListMeta.args.bets} {...BlueBankList.args} className={styles.bankList} />
            </Container>
        </div>
    );
}

export default MainContent;
