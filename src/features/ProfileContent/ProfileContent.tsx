import c from 'clsx';
import styles from './ProfileContent.module.scss';
import EditableForm from 'components/EditableForm';
import { nameFieldSchema } from 'schemas/user';
import useProfileContent from './hooks/useProfileContent';
import { object } from 'yup';
import ControlledInput from 'components/ControlledInput';
import { WithOperations } from 'components/OperationsHistory/OperationsHistory.stories';
import OperationsHistory from 'components/OperationsHistory';
import Image from 'next/image';
import Avatar from 'components/Avatar';
import Button from 'components/Button';

const nameSchema = object({
    name: nameFieldSchema,
});

const depositTitles = {
    date: 'Дата',
    sum: 'Сумма',
};

const withdrawalTitles = {
    date: 'Дата',
    sum: 'Сумма',
    walletType: 'Тип кошелька',
    wallet: 'Кошелек',
    status: 'Статус',
};

function ProfileContent() {
    const { user, formState, changeHandler, saveHandler } = useProfileContent();

    return (
        <div className={c(styles.content, 'content')}>
            <div className="content center">
                <h6 className="title">Изображение профиля</h6>
                <Avatar src={user!.avatar} size={100} />
                <Button color="black" className={styles.changeAvatarBtn}>
                    Изменить
                </Button>
            </div>
            <EditableForm
                title="Имя"
                isSaving={false}
                validationSchema={nameSchema}
                normalContent={<p>{user?.name}</p>}
                renderEditModeContent={({ control }) => (
                    <ControlledInput name="name" control={control} value={formState.name} onChange={changeHandler('name')} autoFocus />
                )}
                defaultValidationValues={{ name: user?.name }}
                onSave={saveHandler}
            />
            <div className="content">
                <OperationsHistory name="История пополнений" titles={depositTitles} {...WithOperations.args} className={styles.depositHistory} />
                <OperationsHistory
                    name="История вывода средств"
                    titles={withdrawalTitles}
                    data={[
                        {
                            date: '22.03.2022',
                            sum: '1000',
                            walletType: 'Qiwi',
                            wallet: '7*******567',
                            status: 'Выполнено',
                        },
                        {
                            date: '21.03.2022',
                            sum: '500',
                            walletType: 'Qiwi',
                            wallet: '7*******567',
                            status: 'Выполнено',
                        },
                        {
                            date: '20.03.2022',
                            sum: '750',
                            walletType: 'Qiwi',
                            wallet: '7*******567',
                            status: 'Выполнено',
                        },
                        {
                            date: '19.03.2022',
                            sum: '250',
                            walletType: 'Qiwi',
                            wallet: '7*******567',
                            status: 'Выполнено',
                        },
                        {
                            date: '18.03.2022',
                            sum: '1250',
                            walletType: 'Qiwi',
                            wallet: '7*******567',
                            status: 'Выполнено',
                        },
                        {
                            date: '17.03.2022',
                            sum: '1500',
                            walletType: 'Qiwi',
                            wallet: '7*******567',
                            status: 'Выполнено',
                        },
                        {
                            date: '16.03.2022',
                            sum: '2000',
                            walletType: 'Qiwi',
                            wallet: '7*******567',
                            status: 'Выполнено',
                        },
                    ]}
                    className={styles.withdrawalHistory}
                    tableWrapperClassName={styles.withdrawalHistoryTableWrapper}
                />
            </div>
        </div>
    );
}

export default ProfileContent;
