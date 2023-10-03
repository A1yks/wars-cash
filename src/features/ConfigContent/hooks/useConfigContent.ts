import { ChangeSiteConfigReq } from '@backend/controllers/site-config/types';
import useAppSelector from 'hooks/useAppSelector';
import useFormState from 'hooks/useFormState';
import { useEffect } from 'react';
import { useChangeConfigMutation, useGetConfigQuery } from 'store/api/siteConfig';
import { SiteConfigState } from 'store/reducers/siteConfigSlice';

let configLoaded = false;

function useConfigContent() {
    const { isFetching: isGettingConfig } = useGetConfigQuery();
    const [changeConfigMutation, { isLoading: isUpdatingConfig }] = useChangeConfigMutation();
    const config = useAppSelector((state) => state.siteConfig);
    const { formState, changeHandler, setFormState } = useFormState(() => config);

    useEffect(() => {
        if (config.isAdminConfigLoaded && !configLoaded) {
            configLoaded = true;
            setFormState(config);
        }
    }, [config, setFormState]);

    function saveHandler(key: keyof Omit<SiteConfigState, 'bonuses'>) {
        return async () => {
            await changeConfigMutation({ [key]: formState[key] }).unwrap();
        };
    }

    function changeBonusHandler(bonusType: keyof SiteConfigState['bonuses']) {
        return (e: React.ChangeEvent<HTMLInputElement>) => {
            setFormState((prevState) => ({ ...prevState, bonuses: { ...prevState.bonuses, [bonusType]: e.target.value } }));
        };
    }

    function saveBonusHandler(bonusType: keyof SiteConfigState['bonuses']) {
        return async () => {
            await changeConfigMutation({ bonuses: { [bonusType]: formState.bonuses[bonusType] } } as ChangeSiteConfigReq).unwrap();
        };
    }

    return { isGettingConfig, isUpdatingConfig, config, formState, changeHandler, changeBonusHandler, saveHandler, saveBonusHandler };
}

export default useConfigContent;
