import c from 'clsx';
import styles from './ProfileContent.module.scss';
import EditableForm from 'components/EditableForm';
import useProfileContent from './hooks/useProfileContent';
import ControlledInput from 'components/ControlledInput';
import { WithOperations } from 'components/OperationsHistory/OperationsHistory.stories';
import OperationsHistory from 'components/OperationsHistory';
import Avatar from 'components/Avatar';
import Button from 'components/Button';
import Container from 'components/Container';
import { changeNameSchema } from '@backend/controllers/user/validation';
import { IPayment } from '@backend/models/Payment/types';
import dayjs from 'dayjs';

type PaymentData = Omit<IPayment, '_id' | 'user' | 'date'> & { date: string };

const depositTitles = {
    date: 'Дата',
    sum: 'Сумма',
};

const withdrawalTitles: Record<keyof PaymentData, string> = {
    date: 'Дата',
    sum: 'Сумма',
    paymentSystem: 'Тип кошелька',
    wallet: 'Кошелек',
    status: 'Статус',
};

function ProfileContent() {
    const { user, payments, formState, isUpdatingName, isUpdatingAvatar, isLoadingPayments, changeHandler, changeName, selectPhotoHandler } =
        useProfileContent();

    if (user === null) {
        return null;
    }

    return (
        <Container>
            <div className={c(styles.content, 'content')}>
                <div className="content center">
                    <h6 className="title">Изображение профиля</h6>
                    <Avatar src={user.avatar} size={100} />
                    <Button color="black" className={styles.changeAvatarBtn} onClick={selectPhotoHandler} loading={isUpdatingAvatar}>
                        Изменить
                    </Button>
                </div>
                <EditableForm
                    title="Имя"
                    isSaving={isUpdatingName}
                    validationSchema={changeNameSchema}
                    normalContent={<p className={styles.userName}>{user?.name}</p>}
                    editableContentButtonsWrapperClassName={styles.changeNameButtonsWrapper}
                    renderEditModeContent={({ control }) => (
                        <ControlledInput name="name" control={control} value={formState.name} onChange={changeHandler('name')} autoFocus />
                    )}
                    defaultValidationValues={{ name: user?.name }}
                    onSave={changeName}
                />
                <div className="content">
                    <OperationsHistory name="История пополнений" titles={depositTitles} {...WithOperations.args} className={styles.depositHistory} />
                    <OperationsHistory
                        name="История вывода средств"
                        titles={withdrawalTitles}
                        data={payments.map((payment) => {
                            const { _id, user, ...paymentData } = payment;

                            (paymentData as unknown as PaymentData).date = dayjs(paymentData.date).format('DD.MM.YYYY');

                            return paymentData;
                        })}
                        className={styles.withdrawalHistory}
                        tableWrapperClassName={styles.withdrawalHistoryTableWrapper}
                        isLoading={isLoadingPayments}
                    />
                </div>
            </div>
        </Container>
    );
}

export default ProfileContent;
