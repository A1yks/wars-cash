import c from 'clsx';
import styles from './UserInfoCard.module.scss';
import { IUser } from '@backend/models/User/types';
import UserCard from 'components/UserCard';
import Button from 'components/Button';
import { UserAdminInfo } from '@backend/services/user/types';
import EditableForm from 'components/EditableForm';
import ControlledInput from 'components/ControlledInput';
import { object } from 'yup';
import { newBalanceField } from '@backend/controllers/user/validation';
import useInputNumber from 'hooks/useInputNumber';
import formatNumber from '@backend/utils/formatNumber';
import useErrorsHandler from 'hooks/useErrorsHandler';

export type UserInfoCardProps = Omit<UserAdminInfo, '_id'> & {
    userId: IUser['_id'];
    className?: string;
    isUpdatingBalance?: boolean;
    saveBalanceHandler: (userId: IUser['_id'], newBalance: number) => MaybePromise<void>;
};

const balanceValidationSchema = object({ newBalance: newBalanceField });

function UserInfoCard(props: UserInfoCardProps) {
    const {
        value: balance,
        inpValue: balanceValue,
        inpChangeHandler: changeBalanceHandler,
        inpBlurHandler,
    } = useInputNumber({ initialValue: props.balance });

    console.log(balance);

    function saveBalanceHandler() {
        props.saveBalanceHandler(props.userId, formatNumber(balance));
    }

    return (
        <div className={c(styles.card, props.className)}>
            <div className={styles.info}>
                <UserCard name={props.name} avatarSrc={props.avatarSrc} />
                <div className={styles.stats}>
                    <EditableForm
                        className={styles.statsEditableForm}
                        contentClassName={styles.statsEditableFormContent}
                        titleWrapperClassName={styles.statsEditableFormTitleWrapper}
                        editableContentButtonsWrapperClassName={styles.statsEditableFormButtonsWrapper}
                        isSaving={props.isUpdatingBalance}
                        validationSchema={balanceValidationSchema}
                        normalContent={<div>Баланс: {props.balance} руб.</div>}
                        renderEditModeContent={({ control }) => (
                            <ControlledInput
                                name="newBalance"
                                control={control}
                                placeholder="Новый баланс"
                                value={balanceValue}
                                onChange={changeBalanceHandler}
                                onBlur={inpBlurHandler}
                                autoFocus
                                autoComplete="off"
                                className={styles.newBalanceInp}
                            />
                        )}
                        defaultValidationValues={{ newBalance: props.balance }}
                        onSave={saveBalanceHandler}
                    />
                    <div>Выведено: {props.withdrawn} руб.</div>
                    <div>Пополнено: {props.deposited} руб.</div>
                </div>
            </div>
            <div className={styles.actions}>
                {props.isBanned ? <Button>Разблокировать</Button> : <Button color="red">Заблокировать</Button>}
                <Button>История вывода</Button>
                <Button>История пополнений</Button>
            </div>
        </div>
    );
}

export default UserInfoCard;
