import c from 'clsx';
import styles from './BonusContent.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock } from '@fortawesome/free-solid-svg-icons';
import dayjs from 'dayjs';
import Button from 'components/Button';

export type BonusContentProps = {};

function BonusContent(props: BonusContentProps) {
    const isBonusAvailable = false;
    const bonusText = isBonusAvailable ? 'Бонус уже доступен!' : `Бонус будет доступен ${dayjs().format('DD.MM.YYYY в HH:mm')}`;

    return (
        <form className={c(styles.bonus, 'content')}>
            <h3 className="title">Ежедневный бонус</h3>
            <p className={c(styles.bonusText, { [styles.bonusAvailable]: isBonusAvailable, [styles.bonusNotAvailable]: !isBonusAvailable })}>
                <FontAwesomeIcon icon={faLock} /> <span>{bonusText}</span>
            </p>
            <Button disabled={!isBonusAvailable} color="black" type="submit" className={styles.claimBonusBtn}>
                Получить бонус
            </Button>
        </form>
    );
}

export default BonusContent;
