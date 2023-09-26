import c from 'clsx';
import styles from './BonusContent.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock } from '@fortawesome/free-solid-svg-icons';
import Button from 'components/Button';
import useBonusContent from './hooks/useBonusContent';
import Spinner from 'components/Spinner/Spinner';

function BonusContent() {
    const { isBonusAvailable, isGettingBonusInfo, isClaimingBonus, bonusText, claimBonusHandler } = useBonusContent();

    return (
        <form className={c(styles.bonus, 'content')} onSubmit={claimBonusHandler}>
            <h3 className="title">Ежедневный бонус</h3>
            {isGettingBonusInfo ? (
                <Spinner />
            ) : (
                <p className={c(styles.bonusText, { [styles.bonusAvailable]: isBonusAvailable, [styles.bonusNotAvailable]: !isBonusAvailable })}>
                    <FontAwesomeIcon icon={faLock} /> <span>{bonusText}</span>
                </p>
            )}
            <Button disabled={!isBonusAvailable} color="black" type="submit" className={styles.claimBonusBtn} loading={isClaimingBonus}>
                Получить бонус
            </Button>
        </form>
    );
}

export default BonusContent;
