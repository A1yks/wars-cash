import useAppSelector from 'hooks/useAppSelector';
import useErrorsHandler from 'hooks/useErrorsHandler';
import useFormState from 'hooks/useFormState';

function useProfileContent() {
    const user = useAppSelector((state) => state.auth.user);
    const { formState, changeHandler } = useFormState(() => ({
        name: user?.name,
    }));

    const saveHandler = useErrorsHandler(() => {});

    return { user, formState, changeHandler, saveHandler };
}

export default useProfileContent;
