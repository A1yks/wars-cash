import c from 'clsx';
import styles from './UserInfoCard.module.scss';
import { IUser, Roles, compareRoles } from '@backend/models/User/types';
import UserCard from 'components/UserCard';
import Button from 'components/Button';
import { UserAdminInfo } from '@backend/services/user/types';
import EditableForm from 'components/EditableForm';
import ControlledInput from 'components/ControlledInput';
import { object } from 'yup';
import { newBalanceField } from '@backend/controllers/user/validation';
import useInputNumber from 'hooks/useInputNumber';
import formatNumber from '@backend/utils/formatNumber';
import Select from 'components/Select';
import { useState } from 'react';

export type UserInfoCardProps = Omit<UserAdminInfo, '_id'> & {
    userId: IUser['_id'];
    adminId: IUser['_id'];
    adminRole: Roles;
    className?: string;
    isUpdatingBalance?: boolean;
    isUpdatingRole?: boolean;
    isUpdatingUserAccess?: boolean;
    saveBalanceHandler: (userId: IUser['_id'], newBalance: number) => MaybePromise<void>;
    saveRoleHandler: (userId: IUser['_id'], newRole: Roles) => MaybePromise<void>;
    onBan: (userId: IUser['_id']) => MaybePromise<void>;
    onUnban: (userId: IUser['_id']) => MaybePromise<void>;
};

const balanceValidationSchema = object({ newBalance: newBalanceField });
const adaptiveRoles = {
    [Roles.MainAdmin]: 'Главный администратор',
    [Roles.Admin]: 'Администратор',
    [Roles.Moderator]: 'Модератор',
    [Roles.Premium]: 'Премиум',
    [Roles.Vip]: 'VIP',
    [Roles.User]: 'Пользователь',
};

function UserInfoCard(props: UserInfoCardProps) {
    const {
        value: balance,
        inpValue: balanceValue,
        inpChangeHandler: changeBalanceHandler,
        inpBlurHandler,
    } = useInputNumber({ initialValue: props.balance });
    const noAdminActions = props.role === Roles.MainAdmin || compareRoles(props.role, props.adminRole);
    const isSameId = props.userId === props.adminId;
    const showRestrictBtn = !isSameId && !noAdminActions;
    const [selectedRole, setSelectedRole] = useState<Roles>(props.role);

    function saveBalanceHandler() {
        return props.saveBalanceHandler(props.userId, formatNumber(balance));
    }

    function saveRoleHandler() {
        return props.saveRoleHandler(props.userId, selectedRole);
    }

    function changeRoleHandler(e: React.ChangeEvent<HTMLSelectElement>) {
        setSelectedRole(e.target.value as Roles);
    }

    function banHandler() {
        props.onBan(props.userId);
    }

    function unbanHandler() {
        props.onUnban(props.userId);
    }

    return (
        <div className={c(styles.card, props.className)}>
            <div className={styles.info}>
                <UserCard name={props.name} avatarSrc={props.avatarSrc} avatarRole={props.role} />
                <div className={styles.stats}>
                    <EditableForm
                        className={styles.statsEditableForm}
                        contentClassName={styles.statsEditableFormContent}
                        titleWrapperClassName={styles.statsEditableFormTitleWrapper}
                        editModeContentClassName={styles.statsEditableFormEditModeContent}
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
                                className={styles.editableInp}
                            />
                        )}
                        defaultValidationValues={{ newBalance: props.balance }}
                        onSave={saveBalanceHandler}
                    />
                    {noAdminActions || isSameId ? (
                        <div>Роль: {adaptiveRoles[props.role]}</div>
                    ) : (
                        <EditableForm
                            className={styles.statsEditableForm}
                            contentClassName={styles.statsEditableFormContent}
                            titleWrapperClassName={styles.statsEditableFormTitleWrapper}
                            editModeContentClassName={styles.statsEditableFormEditModeContent}
                            editableContentButtonsWrapperClassName={styles.statsEditableFormButtonsWrapper}
                            isSaving={props.isUpdatingRole}
                            normalContent={<div>Роль: {adaptiveRoles[props.role]}</div>}
                            renderEditModeContent={() => (
                                <Select className={styles.editableInp} value={selectedRole} onChange={changeRoleHandler}>
                                    <option value={Roles.Admin}>Администратор</option>
                                    <option value={Roles.Moderator}>Модератор</option>
                                    <option value={Roles.Premium}>Премиум</option>
                                    <option value={Roles.Vip}>VIP</option>
                                    <option value={Roles.User}>Пользователь</option>
                                </Select>
                            )}
                            onSave={saveRoleHandler}
                        />
                    )}

                    <div>Выведено: {props.withdrawn} руб.</div>
                    <div>Пополнено: {props.deposited} руб.</div>
                </div>
            </div>
            <div className={styles.actions}>
                {showRestrictBtn ? (
                    props.isBanned ? (
                        <Button onClick={unbanHandler} loading={props.isUpdatingUserAccess}>
                            Разблокировать
                        </Button>
                    ) : (
                        <Button color="red" onClick={banHandler} loading={props.isUpdatingUserAccess}>
                            Заблокировать
                        </Button>
                    )
                ) : null}
                <Button>История вывода</Button>
                <Button>История пополнений</Button>
            </div>
        </div>
    );
}

export default UserInfoCard;
