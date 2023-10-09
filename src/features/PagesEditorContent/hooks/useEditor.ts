import { changePageContentDataSchema } from '@backend/controllers/site-info/validation';
import { ISiteInfo } from '@backend/models/SiteInfo/types';
import useFormValidation from 'hooks/useFormValidation';
import { useSnackbar } from 'notistack';
import React, { useEffect, useState } from 'react';
import { useChangePageContentMutation } from 'store/api/siteInfo';

function useEditor(page: ISiteInfo) {
    const [title, setTitle] = useState(page.title);
    const [content, setContent] = useState(page.content);
    const [changePageContentMutation, { isLoading: isUpdatingPageContent }] = useChangePageContentMutation();
    const { enqueueSnackbar } = useSnackbar();

    const titleWasChanged = title !== page.title;
    const contentWasChanged = content !== page.content;
    const dataWasChanged = titleWasChanged || contentWasChanged;

    const { control, submitHandler } = useFormValidation(
        changePageContentDataSchema,
        async () => {
            await changePageContentMutation({
                type: page.type,
                data: {
                    title: titleWasChanged ? title : undefined,
                    content: contentWasChanged ? content : undefined,
                },
            }).unwrap();
            enqueueSnackbar('Изменения сохранены', { variant: 'success' });
        },
        {
            defaultValues: {
                title: page.title,
                content: page.content,
            },
        }
    );

    useEffect(() => {
        setTitle(page.title);
        setContent(page.content);
    }, [page]);

    function titleChangeHandler(e: React.ChangeEvent<HTMLInputElement>) {
        setTitle(e.target.value);
    }

    function contentChangeHandler(value: string) {
        setContent(value);
    }

    function cancelClickHandler() {
        setTitle(page.title);
        setContent(page.content);
    }

    return {
        control,
        isUpdatingPageContent,
        title,
        content,
        dataWasChanged,
        submitHandler,
        titleChangeHandler,
        contentChangeHandler,
        cancelClickHandler,
    };
}

export default useEditor;
