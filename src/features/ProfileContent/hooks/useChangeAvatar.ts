import useImageUpload from 'hooks/useImageUpload';
import { useCallback } from 'react';
import { useChangeAvatarMutation } from 'store/api/user';

function useChangeAvatar() {
    const [changeAvatar, { isLoading: isUpdatingAvatar }] = useChangeAvatarMutation();

    const { selectPhotoHandler } = useImageUpload(changeAvatar, { formDataKey: 'avatar' });

    return { isUpdatingAvatar, selectPhotoHandler };
}

export default useChangeAvatar;
