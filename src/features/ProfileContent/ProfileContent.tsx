import c from 'clsx';
import styles from './ProfileContent.module.scss';
import EditableForm from 'components/EditableForm';
import useProfileContent from './hooks/useProfileContent';
import ControlledInput from 'components/ControlledInput';
import Avatar from 'components/Avatar';
import Button from 'components/Button';
import Container from 'components/Container';
import { changeNameSchema } from '@backend/controllers/user/validation';
import { IPayment } from '@backend/models/Payment/types';
import DepositsTable from 'features/DepositsTable/DepositsTable';
import PaymentRequestsTable from 'features/PaymentRequestsTable/PaymentRequestsTable';
import { faHistory } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

type PaymentData = Omit<IPayment, '_id' | 'user' | 'date'> & { date: string };

function ProfileContent() {
    const { user, formState, isUpdatingName, isUpdatingAvatar, changeHandler, changeName, selectPhotoHandler } = useProfileContent();

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
                    <h6 className={styles.tableTitle}>
                        <FontAwesomeIcon icon={faHistory} />
                        <span>История пополнений</span>
                    </h6>
                    <DepositsTable tableClassName={styles.table} />
                    <h6 className={styles.tableTitle}>
                        <FontAwesomeIcon icon={faHistory} />
                        <span>История вывода</span>
                    </h6>
                    <PaymentRequestsTable staticStatus className={styles.paymentsTable} tableClassName={styles.table} />
                    {/* <OperationsHistory name="История пополнений" titles={depositTitles} {...WithOperations.args} className={styles.depositHistory} /> */}
                    {/* <OperationsHistory
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
                    /> */}
                </div>
            </div>
        </Container>
    );
}

export default ProfileContent;
