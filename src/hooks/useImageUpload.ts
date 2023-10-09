import { MutationTrigger } from '@reduxjs/toolkit/dist/query/react/buildHooks';
import { useCallback } from 'react';
import useErrorsHandler from './useErrorsHandler';
import { MutationDefinition } from '@reduxjs/toolkit/dist/query';

type Config =
    | {
          customCallback: true;
          formDataKey?: never;
      }
    | {
          customCallback?: never;
          formDataKey: string;
      };

function useImageUpload<T extends MutationTrigger<MutationDefinition<any, any, any, any>>>(
    uploadMutationOrCustomCallback: T | ((file: File) => void),
    config?: Config
) {
    const finalConfig = { formDataKey: 'image', ...config } as Config;

    const uploadCallback = useErrorsHandler(async (file: File) => {
        const formData = new FormData();
        formData.append(finalConfig.formDataKey!, file);

        await (uploadMutationOrCustomCallback as T)(formData).unwrap();
    });

    const selectPhotoHandler = useCallback(() => {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*';

        input.onchange = () => {
            if (input.files) {
                const file = input.files[0];

                if (finalConfig.customCallback) {
                    uploadMutationOrCustomCallback(file);
                } else {
                    uploadCallback(file);
                }
            }
        };

        input.click();
    }, [finalConfig.customCallback, uploadCallback, uploadMutationOrCustomCallback]);

    return { selectPhotoHandler };
}

export default useImageUpload;
