import c from 'clsx';
import styles from './ConfigContent.module.scss';
import EditableForm from 'components/EditableForm';
import ControlledInput from 'components/ControlledInput';
import { object } from 'yup';
import {
    betsTimeField,
    chatMessagesToSaveField,
    minWithdrawalAmountField,
    premiumBonusField,
    randomOrgApiKeyField,
    spinDurationField,
    userBonusField,
    vipBonusField,
} from '@backend/controllers/site-config/validation';
import useConfigContent from './hooks/useConfigContent';
import PageLoader from 'components/PageLoader';
import { Roles } from '@backend/models/User/types';

const randomOrgApiKeySchema = object({ randomOrgApiKey: randomOrgApiKeyField });
const minWithdrawalAmountSchema = object({ minWithdrawalAmount: minWithdrawalAmountField });
const spinDurationSchema = object({ spinDuration: spinDurationField });
const betsTimeSchema = object({ betsTime: betsTimeField });
const chatMessagesToSaveSchema = object({ chatMessagesToSave: chatMessagesToSaveField });
const userBonusSchema = object({ userBonus: userBonusField });
const vipBonusSchema = object({ vipBonus: vipBonusField });
const premiumBonusSchema = object({ premiumBonus: premiumBonusField });

function ConfigContent() {
    const { isGettingConfig, isUpdatingConfig, config, formState, changeHandler, changeBonusHandler, saveHandler, saveBonusHandler } =
        useConfigContent();

    if (isGettingConfig) {
        return <PageLoader />;
    }

    return (
        <div className={styles.config}>
            <EditableForm
                className={styles.editableForm}
                contentClassName={styles.editableFormContent}
                titleWrapperClassName={styles.editableFormTitleWrapper}
                isSaving={isUpdatingConfig}
                validationSchema={randomOrgApiKeySchema}
                title="API ключ random.org"
                normalContent={<p>{formState.randomOrgApiKey}</p>}
                renderEditModeContent={({ control }) => (
                    <ControlledInput
                        name="randomOrgApiKey"
                        control={control}
                        placeholder="Ключ"
                        value={formState.randomOrgApiKey}
                        onChange={changeHandler('randomOrgApiKey')}
                        autoFocus
                        autoComplete="off"
                    />
                )}
                defaultValidationValues={{ randomOrgApiKey: config.randomOrgApiKey }}
                onSave={saveHandler('randomOrgApiKey')}
            />
            <EditableForm
                className={styles.editableForm}
                contentClassName={styles.editableFormContent}
                titleWrapperClassName={styles.editableFormTitleWrapper}
                isSaving={isUpdatingConfig}
                validationSchema={minWithdrawalAmountSchema}
                title="Минимальная сумма для вывода"
                normalContent={<p>{formState.minWithdrawalAmount}</p>}
                renderEditModeContent={({ control }) => (
                    <ControlledInput
                        name="minWithdrawalAmount"
                        control={control}
                        placeholder="Сумма"
                        value={formState.minWithdrawalAmount}
                        onChange={changeHandler('minWithdrawalAmount')}
                        autoFocus
                        autoComplete="off"
                    />
                )}
                defaultValidationValues={{ minWithdrawalAmount: config.minWithdrawalAmount }}
                onSave={saveHandler('minWithdrawalAmount')}
            />
            <EditableForm
                className={styles.editableForm}
                contentClassName={styles.editableFormContent}
                titleWrapperClassName={styles.editableFormTitleWrapper}
                isSaving={isUpdatingConfig}
                validationSchema={spinDurationSchema}
                title="Время вращения колеса"
                normalContent={<p>{formState.spinDuration}</p>}
                renderEditModeContent={({ control }) => (
                    <ControlledInput
                        name="spinDuration"
                        control={control}
                        placeholder="Время"
                        value={formState.spinDuration}
                        onChange={changeHandler('spinDuration')}
                        autoFocus
                        autoComplete="off"
                    />
                )}
                defaultValidationValues={{ spinDuration: config.spinDuration }}
                onSave={saveHandler('spinDuration')}
            />
            <EditableForm
                className={styles.editableForm}
                contentClassName={styles.editableFormContent}
                titleWrapperClassName={styles.editableFormTitleWrapper}
                isSaving={isUpdatingConfig}
                validationSchema={betsTimeSchema}
                title="Время для размещения ставок"
                normalContent={<p>{formState.betsTime}</p>}
                renderEditModeContent={({ control }) => (
                    <ControlledInput
                        name="betsTime"
                        control={control}
                        placeholder="Время"
                        value={formState.betsTime}
                        onChange={changeHandler('betsTime')}
                        autoFocus
                        autoComplete="off"
                    />
                )}
                defaultValidationValues={{ betsTime: config.betsTime }}
                onSave={saveHandler('betsTime')}
            />
            <EditableForm
                className={styles.editableForm}
                contentClassName={styles.editableFormContent}
                titleWrapperClassName={styles.editableFormTitleWrapper}
                isSaving={isUpdatingConfig}
                validationSchema={chatMessagesToSaveSchema}
                title="Количество сохраняемых сообщений в чате"
                normalContent={<p>{formState.chatMessagesToSave}</p>}
                renderEditModeContent={({ control }) => (
                    <ControlledInput
                        name="chatMessagesToSave"
                        control={control}
                        placeholder="Число"
                        value={formState.chatMessagesToSave}
                        onChange={changeHandler('chatMessagesToSave')}
                        autoFocus
                        autoComplete="off"
                    />
                )}
                defaultValidationValues={{ chatMessagesToSave: config.chatMessagesToSave }}
                onSave={saveHandler('chatMessagesToSave')}
            />
            <EditableForm
                className={styles.editableForm}
                contentClassName={styles.editableFormContent}
                titleWrapperClassName={styles.editableFormTitleWrapper}
                isSaving={isUpdatingConfig}
                validationSchema={userBonusSchema}
                title="Размер бонуса для обычных пользователей"
                normalContent={<p>{formState.bonuses.user}</p>}
                renderEditModeContent={({ control }) => (
                    <ControlledInput
                        name="userBonus"
                        control={control}
                        placeholder="Число"
                        value={formState.bonuses.user}
                        onChange={changeBonusHandler(Roles.User)}
                        autoFocus
                        autoComplete="off"
                    />
                )}
                defaultValidationValues={{ userBonus: config.bonuses.user }}
                onSave={saveBonusHandler(Roles.User)}
            />
            <EditableForm
                className={styles.editableForm}
                contentClassName={styles.editableFormContent}
                titleWrapperClassName={styles.editableFormTitleWrapper}
                isSaving={isUpdatingConfig}
                validationSchema={vipBonusSchema}
                title="Размер бонуса для VIP пользователей"
                normalContent={<p>{formState.bonuses.vip}</p>}
                renderEditModeContent={({ control }) => (
                    <ControlledInput
                        name="vipBonus"
                        control={control}
                        placeholder="Число"
                        value={formState.bonuses.vip}
                        onChange={changeBonusHandler(Roles.Vip)}
                        autoFocus
                        autoComplete="off"
                    />
                )}
                defaultValidationValues={{ vipBonus: config.bonuses.vip }}
                onSave={saveBonusHandler(Roles.Vip)}
            />
            <EditableForm
                className={styles.editableForm}
                contentClassName={styles.editableFormContent}
                titleWrapperClassName={styles.editableFormTitleWrapper}
                isSaving={isUpdatingConfig}
                validationSchema={premiumBonusSchema}
                title="Размер бонуса для Premium пользователей"
                normalContent={<p>{formState.bonuses.premium}</p>}
                renderEditModeContent={({ control }) => (
                    <ControlledInput
                        name="premiumBonus"
                        control={control}
                        placeholder="Число"
                        value={formState.bonuses.premium}
                        onChange={changeBonusHandler(Roles.Premium)}
                        autoFocus
                        autoComplete="off"
                    />
                )}
                defaultValidationValues={{ premiumBonus: config.bonuses.premium }}
                onSave={saveBonusHandler(Roles.Premium)}
            />
        </div>
    );
}

export default ConfigContent;
